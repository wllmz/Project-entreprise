const User = require("../../models/Auth/userModel");

exports.allUsers = async (req, res) => {
    try {
        // Récupérer tous les utilisateurs de la base de données
        const users = await User.find({}, { email: 1, username: 1, role: 1 });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}
