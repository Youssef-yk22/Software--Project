import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <header className="relative bg-white shadow">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 sm:text-5xl">
            Unlock Your Potential with <span className="text-blue-600">E-Learn</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of students and instructors on their journey to mastering skills and knowledge.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Link
              href="/auth/register"
              className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
            >
              Get Started
            </Link>
            <Link
              href="/courses"
              className="px-6 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose E-Learn?</h2>
          <p className="mt-4 text-gray-600">
            Learn from experts, access top-notch resources, and achieve your goals.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <img src="/icons/expert.svg" alt="Expert Instructors" className="mx-auto w-12" />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Expert Instructors</h3>
              <p className="mt-2 text-gray-600">
                Learn from industry leaders and certified professionals.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <img src="/icons/resources.svg" alt="Top Resources" className="mx-auto w-12" />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Top Resources</h3>
              <p className="mt-2 text-gray-600">
                Access high-quality videos, quizzes, and interactive content.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <img src="/icons/certificate.svg" alt="Certification" className="mx-auto w-12" />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Certification</h3>
              <p className="mt-2 text-gray-600">
                Earn certificates to showcase your achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
          <p className="mt-4 text-gray-600">Hear from students and instructors who love E-Learn.</p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <p className="text-gray-600 italic">
                &quot;E-Learn transformed the way I approach learning. The resources are unmatched!&quot;
              </p>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">- Sarah M.</h3>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <p className="text-gray-600 italic">
                &quot;I’ve been able to teach effectively and reach more students than ever before.&quot;
              </p>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">- James L.</h3>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <p className="text-gray-600 italic">
                &quot;Highly recommended for anyone serious about upskilling.&quot;
              </p>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">- Maria K.</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Ready to Start Your Journey?</h2>
          <p className="mt-4">
            Sign up today and take the first step towards achieving your goals.
          </p>
          <div className="mt-6">
            <Link
              href="/auth/register"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow hover:bg-gray-100"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
