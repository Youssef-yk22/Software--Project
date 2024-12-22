import Link from 'next/link';

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  description: string;
  image: string;
  rating: number;
  students: number;
}

export default function CourseCard({
  id,
  title,
  instructor,
  description,
  image,
  rating,
  students,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`} className="block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg">
        <div className="relative pt-[56.25%]">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="mb-1 line-clamp-2 min-h-[3rem] text-lg font-semibold text-gray-900 group-hover:text-blue-600">
            {title}
          </h3>
          <p className="mb-2 text-sm text-gray-500">{instructor}</p>
          <p className="mb-4 line-clamp-2 flex-1 text-sm text-gray-600">
            {description}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium text-blue-600">
                {rating.toFixed(1)}
              </span>
              <div className="ml-1 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {students.toLocaleString()} students
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 