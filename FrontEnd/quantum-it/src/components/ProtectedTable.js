// components/ProtectedTable.js

import React, { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import './table.css'; // Import the CSS file

const ProtectedTable = () => {
  const [users, setUsers] = useState([]);
  const history = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      history('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      // User is not authenticated, redirect to login
      history('/login');
    } else {
      // User is authenticated, fetch user data
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/auth/users');
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      fetchUsers();
    }
  }, [history]);

  return (
    <Container>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <div className="table-container">
        <h2>User Information</h2>
        {isAuthenticated() ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>Please log in to view this page.</p>
        )}
      </div>
    </Container>
  );
};

export default ProtectedTable;
