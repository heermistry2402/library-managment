// controllers/accountController.js
const Member = require('../models/memberModel');

exports.addNewUser = async (req, res) => {
  try {
    const { Username, fullName, email, phoneNumber, address, registerDate, dateOfBirth, userRole, userStatus } = req.body;

    const newUser = new Member({
      Username,
      fullName,
      email,
      phoneNumber,
      address,
      registerDate,
      dateOfBirth,
      userRole,
      userStatus,
    });

    await newUser.save();

    res.status(201).json({ message: 'User added successfully!', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add user', error: error.message });
  }
};
