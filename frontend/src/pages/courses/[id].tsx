import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';

// Define the course type
interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  image: string;
  rating: number;
  students: number;
  syllabus: Array<{
    title: string;
    content: string;
  }>;
}

// Mock data
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    instructor: 'John Doe',
    description: 'Learn the fundamentals of web development with HTML, CSS, and JavaScript.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.8,
    students: 15234,
    syllabus: [
      {
        title: 'Week 1: HTML Basics',
        content: 'Introduction to HTML tags and document structure',
      },
      {
        title: 'Week 2: CSS Fundamentals',
        content: 'Styling web pages with CSS',
      },
      {
        title: 'Week 3: JavaScript Essentials',
        content: 'Basic programming concepts with JavaScript',
      },
    ],
  },
  // Add more courses as needed
];

export default function CourseDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (id) {
      // In a real app, you'd fetch this from an API
      const foundCourse = mockCourses.find(c => c.id === id);
      if (foundCourse) {
        setCourse(foundCourse);
      }
    }
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="relative h-96">
            <img
              src={course.image}
              alt={course.title}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
            <p className="mt-2 text-sm text-gray-500">Instructor: {course.instructor}</p>
            
            <div className="mt-4 flex items-center">
              <span className="text-lg font-medium text-blue-600">{course.rating}</span>
              <div className="ml-1 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                ({course.students.toLocaleString()} students)
              </span>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">About this course</h2>
              <p className="mt-2 text-gray-600">{course.description}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">Syllabus</h2>
              <div className="mt-4 space-y-4">
                {course.syllabus.map((week, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                  >
                    <h3 className="font-medium text-gray-900">{week.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{week.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
