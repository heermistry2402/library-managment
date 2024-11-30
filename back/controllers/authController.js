const User = require('../models/userModel');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user without hashing the password
    user = new User({
      username,
      email,
      password, // Not hashed (though it's strongly recommended to hash passwords)
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registration:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
