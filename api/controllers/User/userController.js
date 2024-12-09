import bcrypt from "bcrypt";
import User from "../../models/Auth/userModel.js";

/*update password */
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ msg: "Les nouveaux mots de passe ne correspondent pas" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Ancien mot de passe incorrect" });
    }

    if (newPassword.length < 4) {
      return res.status(400).json({
        msg: "Le nouveau mot de passe doit contenir au moins 4 caractères",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ msg: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

/*update username */
export const changeUsername = async (req, res) => {
  try {
    const { password, newUsername } = req.body;

    // 1. Vérification du mot de passe
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Mot de passe incorrect" });
    }

    // 2. Vérification de l'unicité du nom d'utilisateur
    const existingUser = await User.findOne({ username: newUsername });
    if (existingUser) {
      return res.status(400).json({ msg: "Nom d'utilisateur déjà utilisé" });
    }

    // 3. Mise à jour du nom d'utilisateur
    user.username = newUsername;
    await user.save();

    console.log("Nom d'utilisateur mis à jour :", user.username); // Log pour voir si la mise à jour s'est bien effectuée

    res.status(200).json({ msg: "Nom d'utilisateur mis à jour avec succès" });
  } catch (error) {
    console.error(
      "Erreur serveur lors de la mise à jour du nom d'utilisateur :",
      error
    );
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

/* UPDATE EMAIL */
export const updateEmail = async (req, res) => {
  try {
    const { password, newEmail } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Mot de passe incorrect" });
    }

    const existingUser = await User.findOne({ email: newEmail });
    if (existingUser) {
      return res.status(400).json({ msg: "Email déjà utilisé" });
    }

    user.email = newEmail;
    await user.save();

    res.status(200).json({ msg: "Email mis à jour avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

/* GET USER BY ID */
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};
