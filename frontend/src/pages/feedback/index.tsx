import { useState } from 'react';
import Navbar from '@/components/Navbar';

interface FeedbackItem {
  id: string;
  courseId: string;
  courseName: string;
  rating: number;
  comment: string;
  createdAt: string;
  status: 'pending' | 'submitted';
}

const mockFeedback: FeedbackItem[] = [
  {
    id: '1',
    courseId: '1',
    courseName: 'Introduction to Web Development',
    rating: 4,
    comment: 'Great course! The instructor explains concepts very clearly.',
    createdAt: '2024-03-10',
    status: 'submitted',
  },
  // Add more mock feedback
];

export default function FeedbackPage() {
  const [feedbackList] = useState<FeedbackItem[]>(mockFeedback);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* New Feedback Form */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">Submit Course Feedback</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <div className="mt-1 flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`h-8 w-8 ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Comments
                </label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>

              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Submit Feedback
              </button>
            </div>
          </div>

          {/* Previous Feedback */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">Your Previous Feedback</h2>
            <div className="space-y-4">
              {feedbackList.map((feedback) => (
                <div
                  key={feedback.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{feedback.courseName}</h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${
                            i < feedback.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">{feedback.comment}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Submitted on {feedback.createdAt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 