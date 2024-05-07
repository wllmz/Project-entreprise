const User = require("../../models/Auth/userModel");
const bcrypt = require('bcrypt');

 /* Export all user models */
exports.allUsers = async (req, res) => {
    try {
        // Récupérer tous les utilisateurs de la base de données
        const users = await User.find({}, { email: 1, username: 1, role: 1 });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}


/* Fonction pour changer le rôle d'un utilisateur */
exports.changeUserRole = async (req, res) => {
    const { id } = req.params; 
    const { newRole, adminPassword } = req.body; 

    // Vérification de la présence des données nécessaires
    if (!newRole || !adminPassword) {
        return res.status(400).json({ message: "Le nouveau rôle et le mot de passe de l'administrateur sont requis." });
    }

    try {
        // Récupérer les informations de l'administrateur authentifié
        const adminUser = await User.findById(req.user.id);  

        // Vérifier le mot de passe de l'administrateur
        const isMatch = await bcrypt.compare(adminPassword, adminUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe administrateur incorrect." });
        }

        const user = await User.findById(id);  // Trouver l'utilisateur par son ID

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        user.role = newRole;
        await user.save(); 

        res.status(200).json({ message: "Le rôle de l'utilisateur a été mis à jour.", user: user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur lors de la mise à jour du rôle de l'utilisateur." });
    }
}


/* Fonction pour supprimer un utilisateur */
exports.deleteUser = async (req, res) => {
    const { id } = req.params; 
    const { adminPassword } = req.body; 

    if (!id || !adminPassword) {
        return res.status(400).json({ message: "L'id et le mot de passe de l'administrateur sont requis." });
    }

    try {
        // Récupérer les informations de l'administrateur authentifié
        const adminUser = await User.findById(req.user.id); 

        // Vérifier le mot de passe de l'administrateur
        const isMatch = await bcrypt.compare(adminPassword, adminUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }

        // Supprimer l'utilisateur
        const user = await User.findOneAndDelete({ _id: id });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur lors de la suppression de l'utilisateur." });
    }
}