import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import './css/client.css';
import Navbar from '../Navbar';

const ClientPage = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    dob: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentClientId, setCurrentClientId] = useState(null);

  // Fetch clients from backend on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/clients')
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  // Add new client
  const handleAddClient = () => {
    if (newClient.name && newClient.email) {
      axios.post('http://localhost:5000/clients', newClient)
        .then(response => {
          setClients([...clients, response.data]);
          setNewClient({ name: '', email: '', dob: '', address: '' });
        })
        .catch(error => {
          console.error('Error adding client:', error);
        });
    }
  };

  // Edit client
  const handleEditClient = (client) => {
    setNewClient(client);
    setIsEditing(true);
    setCurrentClientId(client._id);
  };

  // Update client
  const handleUpdateClient = () => {
    axios.put(`http://localhost:5000/clients/${currentClientId}`, newClient)
      .then(response => {
        setClients(clients.map(client =>
          client._id === currentClientId ? response.data : client
        ));
        setNewClient({ name: '', email: '', dob: '', address: '' });
        setIsEditing(false);
        setCurrentClientId(null);
      })
      .catch(error => {
        console.error('Error updating client:', error);
      });
  };

  // Delete client
  const handleDeleteClient = (id) => {
    axios.delete(`http://localhost:5000/clients/${id}`)
      .then(() => {
        setClients(clients.filter(client => client._id !== id));
      })
      .catch(error => {
        console.error('Error deleting client:', error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        {/* Form for Add/Update */}
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center mb-4">{isEditing ? 'Update Client' : 'Add Client'}</h2>
            <Form>
              <Form.Group controlId="formClientName" className="mb-3">
                <Form.Label>Client Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={newClient.name}
                  onChange={handleInputChange}
                  placeholder="Enter client name"
                />
              </Form.Group>

              <Form.Group controlId="formClientEmail" className="mb-3">
                <Form.Label>Client Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={newClient.email}
                  onChange={handleInputChange}
                  placeholder="Enter client email"
                />
              </Form.Group>

              <Form.Group controlId="formClientDob" className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={newClient.dob}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formClientAddress" className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={newClient.address}
                  onChange={handleInputChange}
                  placeholder="Enter client address"
                />
              </Form.Group>

              <Button
                variant={isEditing ? 'warning' : 'primary'}
                onClick={isEditing ? handleUpdateClient : handleAddClient}
              >
                {isEditing ? 'Update Client' : 'Add Client'}
              </Button>
            </Form>
          </div>
        </div>

        {/* Client List Table */}
        <div className="row mt-5">
          <div className="col-md-8 offset-md-2">
            <h3 className="text-center">Client List</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Client Name</th>
                  <th>Client Email</th>
                  <th>Date of Birth</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.length > 0 ? (
                  clients.map((client, index) => (
                    <tr key={client._id}>
                      <td>{index + 1}</td>
                      <td>{client.name}</td>
                      <td>{client.email}</td>
                      <td>{client.dob}</td>
                      <td>{client.address}</td>
                      <td>
                        <Button
                          variant="info"
                          className="me-2"
                          onClick={() => handleEditClient(client)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteClient(client._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No clients found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientPage;
