import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtKey = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: "AccessToken manquant." });
    }

    jwt.verify(accessToken, jwtKey, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "AccessToken invalide ou expiré." });
      }

      // Ajoute les informations utilisateur (y compris le rôle) au req.user
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Erreur dans verifyToken :", error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
