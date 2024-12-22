import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Progress } from '@/types/progress';
import { progressService } from '@/services/progress.service';

// Mock user ID until we have authentication
const MOCK_USER_ID = '1'; // This should come from your auth context/state

export default function MyLearningPage() {
  const [progress, setProgress] = useState<Progress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        // For now, get all progress since we don't have auth yet
        const response = await progressService.getProgress();
        setProgress(response);
      } catch (error) {
        console.error('Error fetching progress:', error);
        setError('Failed to load progress data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your progress...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Learning</h1>
        
        {progress.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No courses in progress</h3>
            <p className="mt-2 text-gray-500">
              Start learning by enrolling in a course
            </p>
            <button 
              onClick={() => window.location.href = '/courses'}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {progress.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{item.course.title}</h2>
                  <span className="text-blue-600 font-medium">
                    {Math.round(item.progress * 100)}% Complete
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${item.progress * 100}%` }}
                  ></div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Completed Modules</p>
                    <p className="text-lg font-medium">{item.completedModules}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Time Spent</p>
                    <p className="text-lg font-medium">{item.timeSpent}h</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Quiz Score</p>
                    <p className="text-lg font-medium">{item.quizScore}%</p>
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <button 
                    onClick={() => window.location.href = `/courses/${item.courseId}`}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Continue Learning
                  </button>
                  <button 
                    onClick={() => window.location.href = `/courses/${item.courseId}/certificate`}
                    className="flex-1 bg-white text-blue-600 px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-50"
                    disabled={item.progress < 1}
                  >
                    {item.progress < 1 ? 'Complete to Get Certificate' : 'View Certificate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 