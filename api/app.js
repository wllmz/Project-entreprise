const express = require('express');
const cors = require('cors');
const app = express();

// Importation des routeurs
const authRoutes = require('./routes/Auth/authRoutes');
const userRoutes = require('./routes/User/userRoutes');
const adminRoutes = require('./routes/Admin/adminRoutes');
const moduleRoutes = require('./routes/Modules/moduleRoutes');

// Fonction pour démarrer le serveur
async function startServer() {
    try {
        // Importe et initialise la connexion à MongoDB
        await require('./db/MongodbConnect'); 

        // Middleware pour le parsing JSON
        app.use(express.json());

        // Middleware pour gérer les requêtes CORS
        app.use(cors({
            origin: ['http://localhost:3000']
          }));
          
        // Utilisation des routes avec un préfixe 
        app.use('/auth', authRoutes);
        app.use('/user', userRoutes);
        app.use('/admin', adminRoutes);
        app.use('/modules', moduleRoutes);

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
}

startServer();
