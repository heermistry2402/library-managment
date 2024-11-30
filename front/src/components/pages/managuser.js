import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import './css/manageuser.css'; // Custom CSS for styling
import Navbar from '../Navbar';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'heer_mistey',fullname:'mistry heer', email: 'heer@example.com', phoneno:'123456789',address:'kadod', registrationDate: '2024-08-04' },
  //  { id: 1, username: 'Pitu_2402',fullname:'vadhiya Pitu', email: 'Pitu@example.com', phoneno:'123456789', address:'bardoli',registrationDate: '2024-08-04' },
  
    // Add more user entries as needed
  ]);

  return (
    <>
      <Navbar />
      <Container className="manage-users-container mt-5">
        <h2 className="text-center mb-4">Manage Users</h2>

        <Row>
          <Col md={12}>
            <Form className="mb-4">
              <Form.Group controlId="search">
                <Form.Control type="text" placeholder="Search users..." />
              </Form.Group>
            </Form>

            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>fullName</th>
                  <th>Email</th>
                  <th>phoneNumber</th>
                  <th>Address</th>
                  <th>Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.fullname}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneno}</td>
                  <td>{user.address}</td>
                    <td>{user.registrationDate}</td>
                    <td>
                      <div className="d-inline-flex">
                        <Button className="edit-btn" variant="outline-primary">
                          <FaEdit /> Edit
                        </Button>
                        <Button className="delete-btn ml-2" variant="outline-danger">
                          <FaTrash /> Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ManageUsers;
