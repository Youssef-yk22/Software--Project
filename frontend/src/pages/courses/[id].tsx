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
  {
    id: '2',
    title: 'Data Science Fundamentals',
    instructor: 'Jane Smith',
    description: 'Master the basics of data science and machine learning.',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.6,
    students: 8921,
    syllabus: [
      {
        title: 'Week 1: Introduction to Data Science',
        content: 'Overview of data science, tools, and workflows',
      },
      {
        title: 'Week 2: Data Cleaning and Preprocessing',
        content: 'Handling missing data, data transformation, and normalization',
      },
      {
        title: 'Week 3: Exploratory Data Analysis',
        content: 'Visualizing data and extracting insights',
      },
      {
        title: 'Week 4: Machine Learning Basics',
        content: 'Introduction to supervised and unsupervised learning algorithms',
      },
      {
        title: 'Week 5: Model Evaluation and Deployment',
        content: 'Evaluating model performance and deploying models in production',
      },
    ],
  },
  {
    id: '3',
    title: 'Mobile App Development with React Native',
    instructor: 'Mike Johnson',
    description: 'Build cross-platform mobile applications using React Native.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.7,
    students: 12543,
    syllabus: [
      {
        title: 'Week 1: Introduction to React Native',
        content: 'Overview of React Native and setting up the development environment',
      },
      {
        title: 'Week 2: Components and Styling',
        content: 'Building UI with React Native components and applying styles',
      },
      {
        title: 'Week 3: Navigation and State Management',
        content: 'Implementing navigation and managing state using Context API or Redux',
      },
      {
        title: 'Week 4: Working with APIs',
        content: 'Fetching data from APIs and displaying it in your app',
      },
      {
        title: 'Week 5: Debugging and Deployment',
        content: 'Debugging common issues and deploying apps to App Store and Google Play',
      },
    ],
  },
  {
    id: '4',
    title: 'Machine Learning Fundamentals',
    instructor: 'Sarah Wilson',
    description: 'Learn the basics of machine learning and AI algorithms.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.9,
    students: 10789,
    syllabus: [
      {
        title: 'Week 1: Introduction to Machine Learning',
        content: 'Understanding machine learning, its applications, and types',
      },
      {
        title: 'Week 2: Data Preparation for Machine Learning',
        content: 'Data collection, cleaning, and preprocessing techniques',
      },
      {
        title: 'Week 3: Supervised Learning Algorithms',
        content: 'Exploring linear regression, decision trees, and SVMs',
      },
      {
        title: 'Week 4: Unsupervised Learning Algorithms',
        content: 'Clustering techniques such as k-means and hierarchical clustering',
      },
      {
        title: 'Week 5: Model Evaluation and Optimization',
        content: 'Performance metrics, hyperparameter tuning, and cross-validation',
      },
      {
        title: 'Week 6: Introduction to Neural Networks',
        content: 'Understanding the basics of neural networks and deep learning',
      },
    ],
  },
  {
    id: '5',
    title: 'Digital Marketing 101',
    instructor: 'Laura Thompson',
    description: 'Learn how to promote your brand and increase online visibility using digital marketing strategies.',
    image: 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.6,
    students: 13456,
    syllabus: [
      {
        title: 'Week 1: Introduction to Digital Marketing',
        content: 'Understanding digital marketing channels and strategies',
      },
      {
        title: 'Week 2: SEO Basics',
        content: 'Optimizing websites for search engines',
      },
      {
        title: 'Week 3: Social Media Marketing',
        content: 'Building and managing social media campaigns',
      },
    ],
  },
  {
    id: '6',
    title: 'Photography Essentials',
    instructor: 'Chris Evans',
    description: 'Master the art of photography and learn to take stunning pictures.',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.7,
    students: 9843,
    syllabus: [
      {
        title: 'Week 1: Basics of Photography',
        content: 'Understanding camera settings and composition',
      },
      {
        title: 'Week 2: Lighting Techniques',
        content: 'Using natural and artificial lighting for better photos',
      },
      {
        title: 'Week 3: Editing Photos',
        content: 'Enhancing images with photo editing software',
      },
    ],
  },
  {
    id: '7',
    title: 'Financial Literacy for Beginners',
    instructor: 'Susan Wright',
    description: 'Understand the basics of managing your personal finances and investing.',
    image: 'https://images.unsplash.com/photo-1556741533-f6acd647c3c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.8,
    students: 15432,
    syllabus: [
      {
        title: 'Week 1: Budgeting Basics',
        content: 'How to create and stick to a budget',
      },
      {
        title: 'Week 2: Saving and Investing',
        content: 'Strategies to grow your wealth',
      },
      {
        title: 'Week 3: Managing Debt',
        content: 'Understanding loans and credit cards',
      },
    ],
  },
  {
    id: '8',
    title: 'Graphic Design Basics',
    instructor: 'Emily Parker',
    description: 'Learn to create visually appealing designs using graphic design principles.',
    image: 'https://logo.com/blog/graphic-design-basics',
    rating: 4.5,
    students: 11234,
    syllabus: [
      {
        title: 'Week 1: Design Principles',
        content: 'Understanding color theory, typography, and layouts',
      },
      {
        title: 'Week 2: Tools and Software',
        content: 'Introduction to Adobe Photoshop and Illustrator',
      },
      {
        title: 'Week 3: Creating a Portfolio',
        content: 'Building a personal design portfolio',
      },
    ],
  },
  {
    id: '9',
    title: 'Introduction to Python Programming',
    instructor: 'James Wilson',
    description: 'Get started with Python programming for beginners.',
    image: 'https://images.unsplash.com/photo-1581092331259-8729de78ac62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.9,
    students: 18234,
    syllabus: [
      {
        title: 'Week 1: Python Basics',
        content: 'Introduction to Python syntax and basic programming concepts',
      },
      {
        title: 'Week 2: Data Structures',
        content: 'Working with lists, dictionaries, and tuples',
      },
      {
        title: 'Week 3: Functions and Modules',
        content: 'Creating reusable code with functions and modules',
      },
    ],
  },
  {
    id: '10',
    title: 'Public Speaking Mastery',
    instructor: 'David Brown',
    description: 'Enhance your communication skills and master the art of public speaking.',
    image: 'https://images.unsplash.com/photo-1522199670076-2852f80289c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.6,
    students: 10234,
    syllabus: [
      {
        title: 'Week 1: Basics of Public Speaking',
        content: 'Building confidence and understanding audience dynamics',
      },
      {
        title: 'Week 2: Speech Writing',
        content: 'Structuring and writing effective speeches',
      },
      {
        title: 'Week 3: Presentation Techniques',
        content: 'Delivering powerful and engaging presentations',
      },
    ],
  },
  {
    id: '11',
    title: 'Fitness and Nutrition Basics',
    instructor: 'Lisa Green',
    description: 'Learn the fundamentals of fitness and maintaining a healthy diet.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.7,
    students: 9034,
    syllabus: [
      {
        title: 'Week 1: Basics of Fitness',
        content: 'Understanding different types of exercises and their benefits',
      },
      {
        title: 'Week 2: Nutrition Essentials',
        content: 'Building a balanced diet for optimal health',
      },
      {
        title: 'Week 3: Creating a Fitness Plan',
        content: 'Designing a workout and meal plan tailored to your goals',
      },
    ],
  },
  {
    id: '12',
    title: 'Cybersecurity Essentials',
    instructor: 'Mark Lee',
    description: 'Understand the basics of cybersecurity and how to protect digital systems.',
    image: 'https://images.unsplash.com/photo-1573497019401-1b612a58e924?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.8,
    students: 11243,
    syllabus: [
      {
        title: 'Week 1: Introduction to Cybersecurity',
        content: 'Understanding threats and vulnerabilities',
      },
      {
        title: 'Week 2: Securing Digital Devices',
        content: 'Best practices for protecting devices and networks',
      },
      {
        title: 'Week 3: Introduction to Ethical Hacking',
        content: 'Basic penetration testing and tools',
      },
    ],
  },
  {
    id: '13',
    title: 'Introduction to Artificial Intelligence',
    instructor: 'Helen Carter',
    description: 'Explore the foundations of AI and its real-world applications.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.9,
    students: 9854,
    syllabus: [
      {
        title: 'Week 1: AI Basics',
        content: 'Understanding AI concepts and history',
      },
      {
        title: 'Week 2: Machine Learning in AI',
        content: 'Overview of machine learning algorithms',
      },
      {
        title: 'Week 3: AI in Practice',
        content: 'Applications of AI in various industries',
      },
    ],
  },
  {
    id: '14',
    title: 'Introduction to Robotics',
    instructor: 'Paul Adams',
    description: 'Learn the basics of robotics and build simple robotic systems.',
    image: 'https://images.unsplash.com/photo-1573496782644-ccd3d5a9eafb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    rating: 4.7,
    students: 7834,
    syllabus: [
      {
        title: 'Week 1: Fundamentals of Robotics',
        content: 'Introduction to robotic systems and components',
      },
      {
        title: 'Week 2: Building Simple Robots',
        content: 'Designing and programming simple robots',
      },
      {
        title: 'Week 3: Robotics in Real Life',
        content: 'Exploring robotic applications in different fields',
      },
    ],
  },
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
