import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';

const featuredCourses = [
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
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-blue-600 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Learn Without Limits
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-blue-100 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Start, switch, or advance your career with thousands of courses from world-class universities and companies.
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <input
                  type="text"
                  placeholder="What do you want to learn?"
                  className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses Section */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Courses</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Top Categories</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {['Programming', 'Data Science', 'Business', 'Design', 'Marketing', 'Photography', 'Music', 'Personal Development'].map((category) => (
              <div
                key={category}
                className="group rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
              >
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                  {category}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
