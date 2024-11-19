import User from "../../models/Auth/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendVerificationEmail } from "../../utils/emailUtils.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// 1. Fonction pour l'inscription d'un utilisateur
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifier que tous les champs nécessaires sont présents
    if (!email || !password || !username) {
      return res.status(400).json({
        message: "Email, mot de passe et nom d'utilisateur sont requis.",
      });
    }

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (!existingUser.verifyEmail) {
        await sendVerificationEmail(existingUser.email);
        return res.status(400).json({
          message:
            "Email déjà utilisé. Vérifiez vos emails pour activer votre compte.",
        });
      }
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    // Vérifier si le nom d'utilisateur existe déjà
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "Nom d'utilisateur déjà utilisé." });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Enregistrer l'utilisateur dans la base de données
    await newUser.save();

    // Envoyer un email de vérification
    try {
      await sendVerificationEmail(newUser.email);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error.message);
    }

    res.status(201).json({
      message:
        "Utilisateur créé avec succès, un email de vérification a été envoyé !",
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error.message);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur" });
  }
};

// 2. Fonction pour la connexion d'un utilisateur
export const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body; // 'login' peut être un email ou un username

    // Recherche d'utilisateur par email ou username
    const user = await User.findOne({
      $or: [{ email: login }, { username: login }],
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Identifiant ou mot de passe incorrect." });
    }

    // Vérifier si l'email est vérifié
    if (!user.verifyEmail) {
      await sendVerificationEmail(user.email);
      return res.status(403).json({
        message: "Email non vérifié. Un email de vérification a été renvoyé.",
      });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Identifiant ou mot de passe incorrect." });
    }

    // Générer un token d'accès et un token de rafraîchissement
    const accessToken = jwt.sign(
      { id: user._id, roles: user.roles },
      JWT_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { id: user._id, roles: user.roles },
      JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Définir un cookie pour le token de rafraîchissement
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    });

    // Renvoyer le token d'accès
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.message);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
};

// 3. Fonction pour rafraîchir le Access Token
export const refreshToken = (req, res) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1];

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Token de rafraîchissement manquant." });
  }

  jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token de rafraîchissement invalide ou expiré." });
    }

    const newAccessToken = jwt.sign(
      { id: decoded.id, roles: decoded.roles },
      JWT_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken: newAccessToken });
  });
};

// 4. Fonction pour la déconnexion d'un utilisateur
export const logoutUser = (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Non autorisé. Token manquant." });
    }

    // Efface le cookie contenant le Refresh Token
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "Strict",
    });

    console.log("Utilisateur déconnecté avec succès");
    res.status(200).json({ message: "Déconnexion réussie." });
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error.message);
    res.status(500).json({ message: "Erreur lors de la déconnexion" });
  }
};

// 5. Route pour vérifier l'email
export const verifyEmail = async (req, res) => {
  const { email } = req.query;

  // Validation de l'email
  if (!email) {
    return res.status(400).json({ message: "Email est requis." });
  }

  console.log("Email reçu pour vérification:", email); // Log de l'email reçu

  try {
    // Rechercher l'utilisateur par email
    const user = await User.findOne({ email });
    console.log("Utilisateur trouvé:", user); // Log de l'utilisateur trouvé

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Vérifiez si l'email a déjà été vérifié
    if (user.verifyEmail) {
      return res.status(400).json({ message: "L'email a déjà été vérifié." });
    }

    // Mettre à jour le champ verifyEmail à true
    user.verifyEmail = true;
    await user.save();

    const accessToken = jwt.sign(
      { id: user._id, roles: user.roles },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    res
      .status(200)
      .json({ message: "Email vérifié avec succès !", accessToken });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email :", error.message);
    res
      .status(500)
      .json({ message: "Erreur lors de la vérification de l'email" });
  }
};
