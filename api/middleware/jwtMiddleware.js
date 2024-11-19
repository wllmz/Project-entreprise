import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtKey = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  try {
    // Vérifie si l'en-tête Authorization existe
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res
        .status(401)
        .json({ message: "L'en-tête Authorization n'existe pas" });
    }

    // Vérifie si le schéma est Bearer  (/* scheme = Bearer + token sinon error 401*/)
    const [scheme, token] = authorizationHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
      return res
        .status(401)
        .json({ message: "Invalid Authorization header format" });
    }

    // Vérifie le jeton JWT
    jwt.verify(token, jwtKey, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      // Le jeton est valide, ajoute les données utilisateur décodées à l'objet de requête
      req.user = decodedToken.user;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
