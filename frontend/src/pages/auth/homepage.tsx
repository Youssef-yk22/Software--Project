// homepage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import '../styles/homepage.css';




const HomePage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/courses');
        setCourses(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses.');
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to Your Learning Dashboard</h1>
        <nav className="homepage-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </nav>
      </header>
      <main className="homepage-content">
        <h2>Explore Our Courses</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="courses-grid">
          {Array.isArray(courses) && courses.length > 0 ? (
            courses.map(course => (
              <div key={course.id} className="course-card">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <button className="enroll-button">Enroll Now</button>
              </div>
            ))
          ) : (
            <p>No courses available at the moment.</p>
          )}
        </div>
      </main>
      <footer className="homepage-footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
