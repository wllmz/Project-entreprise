import User from "../../models/Auth/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendVerificationEmail } from "../../utils/emailUtils.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// Utilitaires pour générer des tokens
const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, roles: user.roles }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

// 1. Fonction pour l'inscription d'un utilisateur
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        message: "Email, mot de passe et nom d'utilisateur sont requis.",
      });
    }

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

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "Nom d'utilisateur déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    await sendVerificationEmail(newUser.email);

    res.status(201).json({
      message:
        "Utilisateur créé avec succès. Un email de vérification a été envoyé.",
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error.message);
    res.status(500).json({
      message: "Erreur serveur lors de la création de l'utilisateur.",
    });
  }
};

// 2. Fonction pour la connexion d'un utilisateur
export const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: login }, { username: login }],
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Identifiant ou mot de passe incorrect." });
    }

    if (!user.verifyEmail) {
      await sendVerificationEmail(user.email);
      return res.status(403).json({
        message: "Email non vérifié. Un email de vérification a été renvoyé.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Identifiant ou mot de passe incorrect." });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Stocke l'accessToken dans un cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
      maxAge: 15 * 60 * 1000, //
    });

    // Stocke le refreshToken dans un cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Connexion réussie." });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.message);
    res.status(500).json({ message: "Erreur serveur lors de la connexion." });
  }
};

// 3. Fonction pour rafraîchir le Access Token
export const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

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

    const newAccessToken = generateAccessToken(decoded);

    // Stocke le nouveau accessToken dans un cookie
    res.cookie("accessToken", newAccessToken, {
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ message: "Token rafraîchi avec succès." });
  });
};

// 4. Fonction pour la déconnexion d'un utilisateur
export const logoutUser = (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: false, // Désactivé pour les tests dans Postman
      sameSite: "Lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true, // Toujours protégé
      sameSite: "Strict",
    });
    res.status(200).json({ message: "Déconnexion réussie." });
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error.message);
    res.status(500).json({ message: "Erreur serveur lors de la déconnexion." });
  }
};

// 5. Route pour vérifier l'email
export const verifyEmail = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email est requis." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    if (user.verifyEmail) {
      return res.status(400).json({ message: "L'email a déjà été vérifié." });
    }

    user.verifyEmail = true;
    await user.save();

    const accessToken = generateAccessToken(user);

    res
      .status(200)
      .json({ message: "Email vérifié avec succès.", accessToken });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email :", error.message);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la vérification de l'email." });
  }
};
