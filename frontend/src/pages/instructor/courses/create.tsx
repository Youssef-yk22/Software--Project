import { useState } from 'react';
import Navbar from '@/components/Navbar';

interface CourseForm {
  title: string;
  description: string;
  price: number;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  syllabus: {
    title: string;
    content: string;
  }[];
}

const initialForm: CourseForm = {
  title: '',
  description: '',
  price: 0,
  category: '',
  level: 'beginner',
  syllabus: [{ title: '', content: '' }],
};

export default function CreateCourse() {
  const [form, setForm] = useState<CourseForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSyllabusChange = (index: number, field: string, value: string) => {
    const newSyllabus = [...form.syllabus];
    newSyllabus[index] = { ...newSyllabus[index], [field]: value };
    setForm({ ...form, syllabus: newSyllabus });
  };

  const addSyllabusItem = () => {
    setForm({
      ...form,
      syllabus: [...form.syllabus, { title: '', content: '' }],
    });
  };

  const removeSyllabusItem = (index: number) => {
    const newSyllabus = form.syllabus.filter((_, i) => i !== index);
    setForm({ ...form, syllabus: newSyllabus });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // API call to create course
      console.log('Submitting course:', form);
    } catch (error) {
      console.error('Error creating course:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Course</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Course Title
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Price and Level */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Level
                  </label>
                  <select
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value as CourseForm['level'] })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Syllabus */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Syllabus</h3>
                  <button
                    type="button"
                    onClick={addSyllabusItem}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Add Module
                  </button>
                </div>
                <div className="space-y-4">
                  {form.syllabus.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-4">
                        <h4 className="text-sm font-medium text-gray-700">Module {index + 1}</h4>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeSyllabusItem(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleSyllabusChange(index, 'title', e.target.value)}
                          placeholder="Module Title"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                        <textarea
                          value={item.content}
                          onChange={(e) => handleSyllabusChange(index, 'content', e.target.value)}
                          placeholder="Module Content"
                          rows={3}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 