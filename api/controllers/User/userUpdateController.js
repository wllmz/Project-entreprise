const User = require("../../models/Auth/userModel");
const bcrypt = require("bcryptjs");

/* UPDATE PASSWORD */
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        
        // Vérifiez que les nouveaux mots de passe correspondent
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ msg: "New passwords do not match" });
        }
        
        // si l'identité de l'utilisateur correspond
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // si l'ancien mot de passe correspond
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid old password" });
        }

        // Hash le nouveau mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Mettez à jour le mot de passe dans la base de données
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
        const { password, newUsername } = req.body;
        
        //l'identité de l'utilisateur
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // si le mot de passe correspond
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        // si le nouvel username est déjà utilisé
        const existingUser = await User.findOne({ username: newUsername });
        if (existingUser) {
            return res.status(400).json({ msg: "Username already exists" });
        }

        // Mettez à jour le nom d'utilisateur dans la base de données
        user.username = newUsername;
        await user.save();

        // Répondez avec un message de succès
        res.status(200).json({ msg: "Username updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

/* UPDATE EMAIL */
exports.updateEmail = async (req, res) => {
    try {
        const { password, newEmail } = req.body;
        
        // l'identité de l'utilisateur
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // si le mot de passe correspond
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        // si le nouvel email est déjà utilisé par un autre utilisateur
        const existingUser = await User.findOne({ email: newEmail });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Mettre à jour l'email dans la base de données
        user.email = newEmail;
        await user.save();

        // Message de succès
        res.status(200).json({ msg: "Email updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};
