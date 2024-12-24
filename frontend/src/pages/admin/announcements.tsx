import { useState } from 'react';
import axios from 'axios';

export default function AdminAnnouncementsPage() {
  const [content, setContent] = useState('');

  const sendAnnouncement = async () => {
    if (!content.trim()) {
      alert('Please enter some content for the announcement.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/admin/announce', { content });
      alert('Announcement sent successfully!');
      setContent(''); // Clear the textarea after sending
    } catch (error) {
      console.error('Error sending announcement:', error);
      alert('Failed to send announcement. Please try again later.');
    }
  };

  return (
    <div className="announcement-container">
      <h1>Send Announcements</h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your announcement here..."
        className="announcement-textarea"
      />
      <button onClick={sendAnnouncement} className="send-button">Send</button>

      {/* Styled-JSX */}
      <style jsx>{`
        .announcement-container {
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        .announcement-textarea {
          width: 100%;
          height: 150px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-top: 20px;
          margin-bottom: 20px;
          resize: none; /* Disable resizing */
        }
        .send-button {
          display: block;
          background-color: #0070f3;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .send-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}
