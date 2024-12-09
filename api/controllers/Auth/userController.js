import User from "../../models/Auth/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendVerificationEmail } from "../../utils/emailUtils.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// 1. Fonction utilitaire pour générer les tokens (AccessToken et RefreshToken)
const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "15m", // 2 minutes pour les tests
  });

  const refreshToken = jwt.sign(
    { id: user._id, roles: user.roles },
    JWT_REFRESH_SECRET,
    {
      expiresIn: "7d", // 7 jours
    }
  );

  return { accessToken, refreshToken };
};

// 2. Fonction utilitaire pour enregistrer les tokens dans les cookies
const setTokenCookies = (
  res,
  accessToken,
  refreshToken,
  expiresIn = 15 * 60 * 1000
) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    domain: ".go-hope.fr", // Inclure tous les sous-domaines
    path: "/",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    domain: ".go-hope.fr", // Inclure tous les sous-domaines
    sameSite: "None",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
  });

  // Log pour vérifier ce qui est envoyé dans les en-têtes Set-Cookie
  console.log("Set-Cookie headers envoyés : ", res.getHeaders()["set-cookie"]);
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

    // Générez les tokens et enregistrez-les dans les cookies
    const { accessToken, refreshToken } = generateTokens(newUser);
    setTokenCookies(res, accessToken, refreshToken);

    res.status(201).json({
      message:
        "Utilisateur créé avec succès, un email de vérification a été envoyé !",
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

    // Générez les tokens et enregistrez-les dans les cookies
    const { accessToken, refreshToken } = generateTokens(user);
    setTokenCookies(res, accessToken, refreshToken);

    // Retournez également les tokens dans la réponse JSON pour Postman
    res.status(200).json({
      message: "Connexion réussie.",
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.message);
    res.status(500).json({ message: "Erreur serveur lors de la connexion." });
  }
};

// 3. Fonction pour rafraîchir le Access Token
export const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  // Vérifiez si le refreshToken est présent dans les cookies
  console.log(
    "Token de rafraîchissement reçu dans les cookies : ",
    refreshToken
  );

  if (!refreshToken) {
    console.log("Aucun refreshToken trouvé.");
    return res
      .status(401)
      .json({ message: "Token de rafraîchissement manquant." });
  }

  // Vérification du refreshToken
  jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      console.error("Erreur de vérification du refreshToken : ", err);
      return res
        .status(403)
        .json({ message: "Token de rafraîchissement invalide ou expiré." });
    }

    console.log("Le refreshToken est valide. Données décodées : ", decoded);

    // Génération d'un nouveau accessToken
    const newAccessToken = jwt.sign(
      { id: decoded.id, roles: decoded.roles },
      JWT_SECRET,
      { expiresIn: "15m" } // Durée de validité du nouveau accessToken (15 minutes)
    );

    // Afficher le nouveau accessToken généré (pour le débogage)
    console.log("Nouveau accessToken généré : ", newAccessToken);

    // Renvoi de la réponse avec accessToken
    res.status(200).json({
      accessToken: newAccessToken,
      message: "Token rafraîchi avec succès.",
    });
  });
};

// 4. Fonction pour la déconnexion d'un utilisateur
export const logoutUser = (req, res) => {
  try {
    // Vérifier si les cookies existent
    const hasRefreshToken = req.cookies?.refreshToken;
    const hasAccessToken = req.cookies?.accessToken;

    if (!hasRefreshToken && !hasAccessToken) {
      console.log("Aucun cookie de token trouvé. Utilisateur déjà déconnecté.");
    }

    // Effacer les cookies liés aux tokens
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    console.log("Cookies de déconnexion effacés avec succès.");
    res.status(200).json({ message: "Déconnexion réussie." });
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error.message);
    res.status(500).json({ message: "Erreur serveur lors de la déconnexion." });
  }
};

// 5. Route pour vérifier l'email
export const verifyEmail = async (req, res) => {
  const { email } = req.query;

  // Validation de l'email
  if (!email) {
    return res.status(400).json({ message: "Email est requis." });
  }

  try {
    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Si l'email a déjà été vérifié
    if (user.verifyEmail) {
      // Redirection vers la page de connexion si l'email est déjà vérifié
      return res.redirect("https://dev-app.go-hope.fr/login");
    }

    // Marquer l'email comme vérifié
    user.verifyEmail = true;
    await user.save();

    // Génération des tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Sauvegarde des tokens dans les cookies
    setTokenCookies(res, accessToken, refreshToken);

    // Redirection vers la page d'accueil après la vérification de l'email
    return res.redirect("https://dev-app.go-hope.fr/");
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la vérification de l'email." });
  }
};
