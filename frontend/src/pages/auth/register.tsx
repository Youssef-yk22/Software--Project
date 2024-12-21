import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: string;
  }>({
    name: '',
    email: '',
    password: '',
    role: 'Student', // Default role
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Ensure value is assigned correctly
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/register', formData);
      setSuccess('Registration successful! You can now log in.');
      setError('');
      console.log('Response:', response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message: string }>;
        setError(axiosError.response?.data?.message || 'Something went wrong. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Register</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded"
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded"
        >
          <option value="Student">Student</option>
          <option value="Instructor">Instructor</option>
          <option value="Admin">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
