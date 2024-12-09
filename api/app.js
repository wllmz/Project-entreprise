import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { connectMongoDb } from "./db/MongodbConnect.js";
// import rateLimit from "express-rate-limit";

// Importation des routeurs
import authRoutes from "./routes/Auth/authRoutes.js";
import userRoutes from "./routes/User/userRoutes.js";
import adminRoutes from "./routes/Admin/adminRoutes.js";
import moduleRoutes from "./routes/Modules/moduleRoutes.js";
import subjectRoutes from "./routes/Subject/subjectRoutes.js";
import commentRoutes from "./routes/Comments/commentRoutes.js";

// Initialisation de l'application Express
const app = express();

app.set("trust proxy", 1);
// Fonction pour démarrer le serveur
async function startServer() {
  try {
    // Connexion à MongoDB
    await connectMongoDb();

    // Middleware de sécurité pour les en-têtes HTTP
    app.use(helmet());

    // Middleware pour le logging des requêtes
    app.use(morgan("tiny"));

    // // Middleware de limitation des requêtes globales
    // app.use(limiter);

    // Middleware pour parser les cookies
    app.use(cookieParser());

    // Middleware pour le parsing JSON
    app.use(express.json());

    // Middleware pour gérer les requêtes CORS
    const allowedOrigins = ["https://dev-app.go-hope.fr"];
    app.use(
      cors({
        origin: (origin, callback) => {
          console.log("Origine de la requête :", origin);
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            console.error("Origine non autorisée :", origin);
            callback(new Error("CORS non autorisé"));
          }
        },
        credentials: true,
      })
    );

    app.use((req, res, next) => {
      const originalSetHeader = res.setHeader;
      res.setHeader = (name, value) => {
        if (name.toLowerCase() === "set-cookie" && Array.isArray(value)) {
          value = value.map((cookie) =>
            cookie
              .replace("SameSite=Lax", "SameSite=None")
              .replace("SameSite=Strict", "SameSite=None")
          );
        }
        originalSetHeader.call(res, name, value);
      };
      next();
    });

    // Logs pour diagnostiquer les requêtes entrantes
    app.use((req, res, next) => {
      console.log(`Requête reçue : ${req.method} ${req.url}`);
      next();
    });

    // Logs des en-têtes envoyés
    app.use((req, res, next) => {
      res.on("finish", () => {
        console.log("En-têtes envoyés :", res.getHeaders()["set-cookie"]);
      });
      next();
    });

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/admin", adminRoutes);
    app.use("/api/modules", moduleRoutes);
    app.use("/api/subjects", subjectRoutes);
    app.use("/api/comments", commentRoutes);

    // Middleware de gestion des erreurs
    app.use((err, req, res, next) => {
      console.error("Erreur attrapée par le middleware :", err.stack);
      res
        .status(500)
        .json({ message: "Une erreur s'est produite.", error: err.message });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

startServer();
