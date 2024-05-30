const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/Auth/userModel");
require("dotenv").config();

const jwtkey = process.env.JWT_SECRET;

/* Controller inscription */
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Vérifier si l'utilisateur existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Utilisateur existant" });
    }

    // Hasher le mot de passe 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créer un nouveau utilisateur
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    // Sauvegarder le nouveau utilisateur dans la base de données
    await newUser.save();
    res
      .status(201)
      .json({ msg: "Utilisateur enregistré avec succès" });
  } catch (error) {
    // Erreur lors de la création 
    console.log(error);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

// Controller login
exports.userLogin = async (req, res) => {
  try {
    const { login, password } = req.body;
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({
      $or: [
        { email: login },
        { username: login }
      ]
    });
    if (!user) {
      return res.status(400).json({ msg: "Utilisateur non trouvé" });
    }
    // Vérifier si le mot de passe est correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Identifiants invalides" });
    }
    // Générer le token
    const payload = {
      user: {
        id: user.id,
        role: user.role,
        username: user.username // Inclure le nom d'utilisateur dans le payload
      }
    };
    jwt.sign(
      payload,
      jwtkey,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token }); 
      }
    );
  } catch (error) {
    // Erreur lors de la création
    console.log(error);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

// Controller logout
exports.logout = (req, res) => {
    try {
        res.status(200).json({ msg: 'Utilisateur déconnecté avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erreur serveur' });
    }
};
