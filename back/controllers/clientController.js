// controllers/clientController.js
const ClientModel = require('../models/clientModel');

// Get all clients
exports.getClients = (req, res) => {
  res.json(ClientModel.getAllClients());
};

// Add a new client
exports.addClient = (req, res) => {
  const client = req.body;
  client.id = Date.now(); // Generate a simple unique ID
  ClientModel.addClient(client);
  res.status(201).json(client);
};

// Update a client
exports.updateClient = (req, res) => {
  const id = req.params.id;
  const updatedClient = req.body;
  updatedClient.id = Number(id); // Ensure the ID is the same
  const result = ClientModel.updateClient(Number(id), updatedClient);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
};

// Delete a client
exports.deleteClient = (req, res) => {
  const id = req.params.id;
  const result = ClientModel.deleteClient(Number(id));
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
};
