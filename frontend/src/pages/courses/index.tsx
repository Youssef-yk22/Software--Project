import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';

const allCourses = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    instructor: 'John Doe',
    description: 'Learn the fundamentals of web development with HTML, CSS, and JavaScript.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.8,
    students: 15234,
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    instructor: 'Jane Smith',
    description: 'Master the basics of data science and machine learning.',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.6,
    students: 8921,
  },
  {
    id: '3',
    title: 'Mobile App Development with React Native',
    instructor: 'Mike Johnson',
    description: 'Build cross-platform mobile applications using React Native.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.7,
    students: 12543,
  },
  {
    id: '4',
    title: 'Machine Learning Fundamentals',
    instructor: 'Sarah Wilson',
    description: 'Learn the basics of machine learning and AI algorithms.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.9,
    students: 10789,
  },
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = allCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-6">
          {/* Search Section */}
          <div className="flex justify-center">
            <div className="w-full max-w-xl">
              <input
                type="text"
                placeholder="Search courses..."
                className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>

          {/* No Results Message */}
          {filteredCourses.length === 0 && (
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search terms or browse all courses
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
