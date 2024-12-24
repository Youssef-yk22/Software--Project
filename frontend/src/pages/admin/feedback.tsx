'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Feedback {
  id: string;
  message: string;
  user: string;
}

export default function AdminFeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/feedback');
        setFeedback(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const deleteFeedback = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/admin/feedback/${id}`);
      setFeedback(feedback.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  if (isLoading) {
    return (
      <div style={styles.loading}>
        <p>Loading feedback...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Manage Feedback</h1>
      {feedback.length === 0 ? (
        <p style={styles.noFeedback}>No feedback available.</p>
      ) : (
        <ul style={styles.feedbackList}>
          {feedback.map((item) => (
            <li key={item.id} style={styles.feedbackItem}>
              <div>
                <p style={styles.message}>"{item.message}"</p>
                <p style={styles.user}>- {item.user}</p>
              </div>
              <button
                style={styles.btnDanger}
                onClick={() => deleteFeedback(item.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
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
  noFeedback: {
    textAlign: 'center' as const,
    fontSize: '18px',
    color: '#7f8c8d',
  },
  feedbackList: {
    listStyleType: 'none' as const,
    padding: 0,
    margin: 0,
  },
  feedbackItem: {
    display: 'flex',
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd',
  },
  message: {
    fontSize: '16px',
    color: '#2c3e50',
    marginBottom: '5px',
  },
  user: {
    fontSize: '14px',
    color: '#7f8c8d',
  },
  btnDanger: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    textAlign: 'center' as const,
  },
  btnDangerHover: {
    backgroundColor: '#c0392b',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    height: '100vh',
    fontSize: '18px',
    color: '#7f8c8d',
  },
};
