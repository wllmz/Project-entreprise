import User from "../../models/Auth/userModel.js";
import bcrypt from "bcrypt";

/* UPDATE PASSWORD */
export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Vérifiez que les nouveaux mots de passe correspondent
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ msg: "Les nouveaux mots de passe ne correspondent pas" });
    }

    // Trouvez l'utilisateur par ID dans les paramètres
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    // Si l'ancien mot de passe correspond
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Ancien mot de passe incorrect" });
    }

    // Validation du nouveau mot de passe (exemple)
    if (newPassword.length < 4) {
      return res.status(400).json({
        msg: "Le nouveau mot de passe doit contenir au moins 4 caractères",
      });
    }

    // Hash le nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Met à jour le mot de passe dans la base de données
    user.password = hashedPassword;
    await user.save();

    // Répondez avec un message de succès
    res.status(200).json({ msg: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

/* UPDATE USERNAME */
export const changeUsername = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, newUsername } = req.body;

    // Trouver l'utilisateur par ID dans les paramètres
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    // Vérifier si l'utilisateur authentifié correspond à l'utilisateur à mettre à jour
    if (user.id !== req.user.id) {
      return res.status(403).json({ msg: "Action non autorisée" });
    }

    // Vérifier si le mot de passe correspond
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Mot de passe incorrect" });
    }

    // Vérifier si le nouvel username est déjà utilisé
    const existingUser = await User.findOne({ username: newUsername });
    if (existingUser) {
      return res.status(400).json({ msg: "Nom d'utilisateur déjà utilisé" });
    }

    // Mettre à jour le nom d'utilisateur dans la base de données
    user.username = newUsername;
    await user.save();

    // Répondre avec un message de succès
    res.status(200).json({ msg: "Nom d'utilisateur mis à jour avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

/* UPDATE EMAIL */
export const updateEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, newEmail } = req.body;

    // Trouver l'utilisateur par ID dans les paramètres
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    // Vérifier si l'utilisateur authentifié correspond à l'utilisateur à mettre à jour
    if (user.id !== req.user.id) {
      return res.status(403).json({ msg: "Action non autorisée" });
    }

    // Vérifier si le mot de passe correspond
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Mot de passe incorrect" });
    }

    // Vérifier si le nouvel email est déjà utilisé par un autre utilisateur
    const existingUser = await User.findOne({ email: newEmail });
    if (existingUser) {
      return res.status(400).json({ msg: "Email déjà utilisé" });
    }

    // Mettre à jour l'email dans la base de données
    user.email = newEmail;
    await user.save();

    // Répondre avec un message de succès
    res.status(200).json({ msg: "Email mis à jour avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

/* GET USER BY ID */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password"); // Exclure le mot de passe
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};
