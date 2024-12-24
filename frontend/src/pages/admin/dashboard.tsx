import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const usersResponse = await axios.get('http://localhost:3000/admin/users');
        const coursesResponse = await axios.get('http://localhost:3000/admin/courses');
        const feedbackResponse = await axios.get('http://localhost:3000/admin/feedback');

        setUserCount(usersResponse.data.length);
        setCourseCount(coursesResponse.data.length);
        setFeedbackCount(feedbackResponse.data.length);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard metrics:', error);
        setIsLoading(false);
      }
    }

    fetchMetrics();
  }, []);

  if (isLoading) {
    return <div style={styles.loading}><p>Loading dashboard...</p></div>;
  }

  return (
    <div style={styles.dashboardContainer}>
      <h1 style={styles.header}>Admin Dashboard</h1>
      <div style={styles.metricsContainer}>
        <div style={styles.metricCard}>
          <h2 style={styles.metricTitle}>Users</h2>
          <p style={styles.metricValue}>{userCount}</p>
          <a style={styles.link} href="/admin/users">Manage Users</a>
        </div>

        <div style={styles.metricCard}>
          <h2 style={styles.metricTitle}>Courses</h2>
          <p style={styles.metricValue}>{courseCount}</p>
          <a style={styles.link} href="/admin/courses">Manage Courses</a>
        </div>

        <div style={styles.metricCard}>
          <h2 style={styles.metricTitle}>Feedback</h2>
          <p style={styles.metricValue}>{feedbackCount}</p>
          <a style={styles.link} href="/admin/feedback">View Feedback</a>
        </div>

        <div style={styles.announcementCard}>
          <h2 style={styles.metricTitle}>Announcements</h2>
          <p style={styles.announcementText}>
            Send platform-wide announcements to users and instructors.
          </p>
          <a style={styles.link} href="/admin/announcements">Send Announcements</a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  dashboardContainer: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
  },
  header: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '20px',
    textAlign: 'center' as const,
  },
  metricsContainer: {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
  },
  metricCard: {
    flex: '1',
    minWidth: '250px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center' as const,
    border: '1px solid #ddd',
  },
  metricTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '10px',
  },
  metricValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1abc9c',
    marginBottom: '10px',
  },
  link: {
    textDecoration: 'none',
    color: '#3498db',
    fontWeight: 'bold',
    transition: 'color 0.3s',
  },
  announcementCard: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center' as const,
    border: '1px solid #ddd',
  },
  announcementText: {
    fontSize: '16px',
    color: '#7f8c8d',
    marginBottom: '10px',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    height: '100vh',
    backgroundColor: '#f5f7fa',
    fontSize: '18px',
    color: '#7f8c8d',
  },
};
