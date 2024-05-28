const User = require("../../models/Auth/userModel");
const bcrypt = require("bcryptjs");

/* UPDATE PASSWORD */
exports.changePassword = async (req, res) => {
    try {
        const { id } = req.params; 
        const { oldPassword, newPassword, confirmPassword } = req.body;
        
        // Vérifiez que les nouveaux mots de passe correspondent
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ msg: "New passwords do not match" });
        }
        
        // Trouvez l'utilisateur par ID dans les paramètres
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // si l'ancien mot de passe correspond
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid old password" });
        }

        // Validation du nouveau mot de passe (exemple)
        if (newPassword.length < 8) {
            return res.status(400).json({ msg: "New password must be at least 8 characters long" });
        }

        // Hash le nouveau mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Met à jour le mot de passe dans la base de données
        user.password = hashedPassword;
        await user.save();

        // Répondez avec un message de succès
        res.status(200).json({ msg: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

/* UPDATE USERNAME */
exports.changeUsername = async (req, res) => {
    try {
        const { id } = req.params; 
        const { password, newUsername } = req.body;
        
        // Trouver l'utilisateur par ID dans les paramètres
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Vérifier si l'utilisateur authentifié correspond à l'utilisateur à mettre à jour
        if (user.id !== req.user.id) {
            return res.status(403).json({ msg: "Unauthorized action" });
        }

        // Vérifier si le mot de passe correspond
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        // Vérifier si le nouvel username est déjà utilisé
        const existingUser = await User.findOne({ username: newUsername });
        if (existingUser) {
            return res.status(400).json({ msg: "Username already exists" });
        }

        // Mettre à jour le nom d'utilisateur dans la base de données
        user.username = newUsername;
        await user.save();

        // Répondre avec un message de succès
        res.status(200).json({ msg: "Username updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};



/* UPDATE EMAIL */
exports.updateEmail = async (req, res) => {
    try {
        const { id } = req.params; 
        const { password, newEmail } = req.body;
        
        // Trouver l'utilisateur par ID dans les paramètres
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Vérifier si l'utilisateur authentifié correspond à l'utilisateur à mettre à jour
        if (user.id !== req.user.id) {
            return res.status(403).json({ msg: "Unauthorized action" });
        }

        // Vérifier si le mot de passe correspond
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        // Vérifier si le nouvel email est déjà utilisé par un autre utilisateur
        const existingUser = await User.findOne({ email: newEmail });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Mettre à jour l'email dans la base de données
        user.email = newEmail;
        await user.save();

        // Répondre avec un message de succès
        res.status(200).json({ msg: "Email updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};


// Récupérer les informations utilisateur par ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password'); // Exclure le mot de passe
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};