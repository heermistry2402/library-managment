// models/clientModel.js
const clients = [];

const ClientModel = {
  getAllClients: () => clients,
  addClient: (client) => {
    clients.push(client);
    return client;
  },
  updateClient: (id, updatedClient) => {
    const index = clients.findIndex(client => client.id === id);
    if (index !== -1) {
      clients[index] = updatedClient;
      return updatedClient;
    }
    return null;
  },
  deleteClient: (id) => {
    const index = clients.findIndex(client => client.id === id);
    if (index !== -1) {
      return clients.splice(index, 1)[0];
    }
    return null;
  }
};

module.exports = ClientModel;
