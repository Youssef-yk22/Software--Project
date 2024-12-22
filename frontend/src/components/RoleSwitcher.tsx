import { useAuth } from '@/contexts/AuthContext';

export default function RoleSwitcher() {
  const { user, setRole } = useAuth();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Development Role Switcher</h3>
      <div className="space-y-2">
        <button
          onClick={() => setRole('student')}
          className={`w-full px-3 py-1 rounded ${
            user?.role === 'student'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Student View
        </button>
        <button
          onClick={() => setRole('instructor')}
          className={`w-full px-3 py-1 rounded ${
            user?.role === 'instructor'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Instructor View
        </button>
        <button
          onClick={() => setRole('admin')}
          className={`w-full px-3 py-1 rounded ${
            user?.role === 'admin'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Admin View
        </button>
      </div>
    </div>
  );
} 