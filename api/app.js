const express = require('express');
const app = express();

// Importation des routeurs
const authRoutes = require('./routes/Auth/authRoutes');
const userRoutes = require('./routes/User/userRoutes');
const adminRoutes = require('./routes/Admin/adminRoutes');

// Fonction pour démarrer le serveur
async function startServer() {
    try {
        // Importe et initialise la connexion à MongoDB
        await require('./db/MongodbConnect'); 

        // Middleware pour le parsing JSON
        app.use(express.json());

        // Utilisation des routes d'authentification avec un préfixe /auth
        app.use('/auth', authRoutes);
        app.use('/user', userRoutes);
        app.use('/admin', adminRoutes);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
}

startServer();
