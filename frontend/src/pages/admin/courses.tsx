import { useState, useEffect } from 'react';
import axios from 'axios';

interface Course {
  id: string;
  title: string;
  status: string;
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch courses from the backend
  useEffect(() => {
    axios
      .get('http://localhost:3000/admin/courses')
      .then((response) => {
        setCourses(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
        setIsLoading(false);
      });
  }, []);

  const archiveCourse = async (courseId: string) => {
    console.log('Attempting to archive course with ID:', courseId); // Debug log
  
    if (!courseId) {
      alert('Invalid Course ID. Please try again.');
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:3000/admin/courses/${courseId}/archive`);
      alert('Course archived successfully!');
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseId ? { ...course, status: 'Archived' } : course
        )
      );
    } catch (err) {
      // Check if error is an Axios error
      if (axios.isAxiosError(err)) {
        // Handle Axios-specific errors
        console.error('Axios error:', err.response?.data || err.message);
        alert(err.response?.data?.message || 'Failed to archive course. Please try again.');
      } else {
        // Handle generic errors
        console.error('Unexpected error:', err);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };
  
  
  
  // Delete a course
  const deleteCourse = async (courseId: string) => {
    console.log('Attempting to delete course with ID:', courseId); // Debug log
  
    if (!courseId) {
      alert('Invalid Course ID. Please try again.');
      return;
    }
  
    try {
      await axios.delete(`http://localhost:3000/admin/courses/${courseId}`);
      alert('Course deleted successfully!');
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error deleting course:', err.response?.data || err.message);
        alert(err.response?.data?.message || 'Failed to delete course. Please try again.');
      } else {
        console.error('Unexpected error:', err);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };
  

  const styles = {
    container: {
      maxWidth: '900px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    } as React.CSSProperties,
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      marginTop: '20px',
    },
    thTd: {
      padding: '12px 15px',
      textAlign: 'left' as const,
      border: '1px solid #ddd',
    },
    th: {
      backgroundColor: '#f4f6f8',
      fontWeight: 'bold' as const,
    },
    trEven: {
      backgroundColor: '#f9f9f9',
    },
    btnPrimary: {
      backgroundColor: '#3498db',
      color: '#fff',
      padding: '8px 12px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginRight: '10px',
      transition: 'background-color 0.3s ease',
    },
    btnDanger: {
      backgroundColor: '#e74c3c',
      color: '#fff',
      padding: '8px 12px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    loading: {
      textAlign: 'center' as const,
      fontSize: '18px',
      color: '#555',
    },
  };

  if (isLoading) {
    return <p style={styles.loading}>Loading courses...</p>;
  }

  return (
    <div style={styles.container}>
      <h1>Manage Courses</h1>
      {courses.length === 0 ? (
        <p style={styles.loading}>No courses available.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.thTd, ...styles.th }}>Title</th>
              <th style={{ ...styles.thTd, ...styles.th }}>Status</th>
              <th style={{ ...styles.thTd, ...styles.th }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr
                key={course.id}
                style={index % 2 === 0 ? styles.trEven : undefined}
              >
                <td style={styles.thTd}>{course.title}</td>
                <td style={styles.thTd}>{course.status}</td>
                <td style={styles.thTd}>
                  <button
                    style={styles.btnPrimary}
                    onClick={() => archiveCourse(course.id)}
                  >
                    Archive
                  </button>
                  <button
                    style={styles.btnDanger}
                    onClick={() => deleteCourse(course.id)}
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
}
