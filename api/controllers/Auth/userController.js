const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/Auth/userModel");
require("dotenv").config();

const jwtkey = process.env.JWT_SECRET;

/* controller inscription */
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // user existe ou non
    const exestingUser = await User.findOne({ email });
    if (exestingUser) {
      return res.status(400).json({ msg: "User existant" });
    }

    // hasher le mot de passe 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creer un nouveau user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    // sauvegarder le nouveau user dans la base de donnée 
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully" });
  } catch (error) {
    // erreur lors de la création 
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Controller login
exports.userLogin = async (req, res) => {
  try {
    const { login, password } = req.body;
    // Check if the user exists
    const user = await User.findOne({
      $or: [
        { email: login },
        { username: login }
      ]
    });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    // Generate the token
    const payload = {
      user: {
        id: user.id,
        role: user.role,
        username: user.username // Include username in the payload
      }
    };
    jwt.sign(
      payload,
      jwtkey,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { username: user.username } }); // Send username in the response
      }
    );
  } catch (error) {
    // Error during creation
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};


// controller logout
exports.logout = (req, res) => {
    try {
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
