import React, { useState } from 'react';
import axios, { AxiosError } from 'axios'; // Import AxiosError for typing the error

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/login', formData);
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      // Redirect to dashboard or home page here
    } catch (error: unknown) {  // Use unknown instead of any
      if (axios.isAxiosError(error)) {  // Check if the error is an AxiosError
        const axiosError = error as AxiosError<{ message: string }>;
        setError(axiosError.response?.data?.message || 'Login failed. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;
