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
  {
    id: '5',
    title: 'Digital Marketing 101',
    instructor: 'Laura Thompson',
    description: 'Learn how to promote your brand and increase online visibility using digital marketing strategies.',
    image: 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.6,
    students: 13456,
  },
  {
    id: '6',
    title: 'Photography Essentials',
    instructor: 'Chris Evans',
    description: 'Master the art of photography and learn to take stunning pictures.',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.7,
    students: 9843,
  },
  {
    id: '7',
    title: 'Financial Literacy for Beginners',
    instructor: 'Susan Wright',
    description: 'Understand the basics of managing your personal finances and investing.',
    image: 'https://images.unsplash.com/photo-1556741533-f6acd647c3c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.8,
    students: 15432,
  },
  {
    id: '8',
    title: 'Graphic Design Basics',
    instructor: 'Emily Parker',
    description: 'Learn to create visually appealing designs using graphic design principles.',
    image: 'https://logo.com/blog/graphic-design-basics',
    rating: 4.5,
    students: 11234,
  },
  {
    id: '9',
    title: 'Introduction to Python Programming',
    instructor: 'James Wilson',
    description: 'Get started with Python programming for beginners.',
    image: 'https://images.unsplash.com/photo-1581092331259-8729de78ac62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.9,
    students: 18234,
  },
  {
    id: '10',
    title: 'Public Speaking Mastery',
    instructor: 'David Brown',
    description: 'Enhance your communication skills and master the art of public speaking.',
    image: 'https://images.unsplash.com/photo-1522199670076-2852f80289c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.6,
    students: 10234,
  },
  {
    id: '11',
    title: 'Fitness and Nutrition Basics',
    instructor: 'Lisa Green',
    description: 'Learn the fundamentals of fitness and maintaining a healthy diet.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.7,
    students: 9034,
  },
  {
    id: '12',
    title: 'Cybersecurity Essentials',
    instructor: 'Mark Lee',
    description: 'Understand the basics of cybersecurity and how to protect digital systems.',
    image: 'https://images.unsplash.com/photo-1573497019401-1b612a58e924?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.8,
    students: 11243,
  },
  {
    id: '13',
    title: 'Introduction to Artificial Intelligence',
    instructor: 'Helen Carter',
    description: 'Explore the foundations of AI and its real-world applications.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.9,
    students: 9854,
  },
  {
    id: '14',
    title: 'Introduction to Robotics',
    instructor: 'Paul Adams',
    description: 'Learn the basics of robotics and build simple robotic systems.',
    image: 'https://images.unsplash.com/photo-1573496782644-ccd3d5a9eafb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.7,
    students: 7834,
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
