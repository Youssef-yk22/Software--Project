import React, { useState, useEffect } from 'react';
import axios from 'axios';


interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:3000/admin/users') // Replace with your API URL
      .then((response) => {
        setUsers(response.data.map((user: any) => ({ ...user, id: user._id }))); // Map _id to id
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  // Delete a user
  const deleteUser = (id: string) => {
    if (!id) {
      alert('Invalid user ID.');
      return;
    }

    axios
      .delete(`http://localhost:3000/admin/users/${id}`) // Replace with your API URL
      .then(() => {
        alert(`User with ID ${id} deleted successfully!`);
        setUsers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting user:', error.response?.data || error.message);
        alert('Failed to delete user. Please try again.');
      });
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '50px auto',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
      textAlign: 'center' as const,
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#495057',
      marginBottom: '20px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      marginTop: '20px',
    },
    th: {
      backgroundColor: '#6c757d',
      color: '#ffffff',
      textTransform: 'uppercase' as const,
      fontSize: '14px',
      padding: '12px 15px',
      textAlign: 'left' as const,
      border: '1px solid #dee2e6',
    },
    td: {
      padding: '12px 15px',
      textAlign: 'left' as const,
      border: '1px solid #dee2e6',
    },
    trEven: {
      backgroundColor: '#f8f9fa',
    },
    trHover: {
      ':hover': {
        backgroundColor: '#f1f3f5',
      },
    },
    btn: {
      display: 'inline-block',
      fontSize: '14px',
      fontWeight: 500,
      textAlign: 'center' as const,
      padding: '8px 16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    },
    btnDanger: {
      backgroundColor: '#e74c3c',
      color: '#ffffff',
    },
    btnDangerHover: {
      backgroundColor: '#c0392b',
    },
    loading: {
      textAlign: 'center' as const,
      fontSize: '18px',
      color: '#17a2b8',
      padding: '10px',
    },
    error: {
      textAlign: 'center' as const,
      fontSize: '18px',
      color: '#dc3545',
      padding: '10px',
      backgroundColor: '#f8d7da',
      border: '1px solid #f5c6cb',
      borderRadius: '5px',
    },
    noUsers: {
      textAlign: 'center' as const,
      fontSize: '18px',
      color: '#6c757d',
      padding: '20px',
    },
  };

  // Display loading or error message
  if (isLoading) return <p style={styles.loading}>Loading users...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  // Render user table
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Manage Users</h1>
      {users.length === 0 ? (
        <p style={styles.noUsers}>No users found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                style={index % 2 === 0 ? styles.trEven : undefined}
              >
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.role}</td>
                <td style={styles.td}>{user.status}</td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.btn, ...styles.btnDanger }}
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsersPage;
