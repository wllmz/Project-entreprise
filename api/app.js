import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Importation des routeurs
import authRoutes from "./routes/Auth/authRoutes.js";
import userRoutes from "./routes/User/userRoutes.js";
import adminRoutes from "./routes/Admin/adminRoutes.js";
import moduleRoutes from "./routes/Modules/moduleRoutes.js";
import subjectRoutes from "./routes/Subject/subjectRoutes.js";
import commentRoutes from "./routes/Comments/commentRoutes.js";

// Initialisation de l'application Express
const app = express();

// Configuration du middleware de limitation des requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite à 100 requêtes par IP
  message:
    "Trop de requêtes effectuées depuis cette IP. Veuillez réessayer plus tard.",
});

// Fonction pour démarrer le serveur
async function startServer() {
  try {
    // Middleware de sécurité pour les en-têtes HTTP
    app.use(helmet());

    // Middleware pour le logging des requêtes
    app.use(morgan("tiny"));

    // Middleware de limitation des requêtes
    app.use(limiter);

    // Importe et initialise la connexion à MongoDB
    await import("./db/MongodbConnect.js");

    // Middleware pour le parsing JSON
    app.use(express.json());

    // Middleware pour gérer les requêtes CORS
    app.use(
      cors({
        origin: ["http://localhost:3000"], // Remplacez ceci par votre domaine en production
      })
    );

    // Utilisation des routes avec un préfixe
    app.use("/auth", authRoutes);
    app.use("/user", userRoutes);
    app.use("/admin", adminRoutes);
    app.use("/modules", moduleRoutes);
    app.use("/subjects", subjectRoutes);
    app.use("/comments", commentRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

startServer();
