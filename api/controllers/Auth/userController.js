const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/Auth/userModel");
require("dotenv").config();

const jwtkey = process.env.JWT_SECRET;

/* controller inscription */
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    /** user existe ou non **/
    const exestingUser = await User.findOne({ email });
    if (exestingUser) {
      return res.status(400).json({ msg: "User existant" });
    }

    /** hasher le mot de passe **/
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    /** creer un nouveau user **/
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    /*sauvegarder le nouveau user dans la base de donnée **/
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    /** erreur lors de la création **/
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

/* controller login */
exports.userLogin = async (req, res) => {
  try {
    const { login , password } = req.body;
    /* check si le user existe ou non **/
    const user = await User.findOne({ 
        $or: [
        { email: login }, 
        { username: login }
    ] });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    /* check si le mot de passe est correct ou non */
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    /* generer le token */
    const payload = {
      user: {
        id: user.id,
      },
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
    /** erreur lors de la création **/
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};


/* controller logout */
exports.logout = (req, res) => {
    try {
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
