import api from './api';
import { Progress } from '@/types/progress';

const mockProgress: Progress[] = [
  {
    id: '1',
    userId: '1',
    courseId: '1',
    progress: 0.6,
    completedModules: 3,
    timeSpent: 12,
    quizScore: 85,
    lastAccessed: new Date(),
    course: {
      id: '1',
      title: 'Introduction to Web Development',
      description: 'Learn the fundamentals of web development',
      instructor: 'John Doe'
    }
  },
  {
    id: '2',
    userId: '1',
    courseId: '2',
    progress: 0.3,
    completedModules: 2,
    timeSpent: 8,
    quizScore: 90,
    lastAccessed: new Date(),
    course: {
      id: '2',
      title: 'Data Science Fundamentals',
      description: 'Master the basics of data science',
      instructor: 'Jane Smith'
    }
  }
];

export const progressService = {
  async getProgress(userId?: string) {
    // Return mock data for now
    return mockProgress;
  },

  async updateProgress(userId: string, courseId: string, data: Partial<Progress>) {
    // Mock update - return updated data
    return {
      ...mockProgress.find(p => p.courseId === courseId),
      ...data
    };
  },

  async calculateCompletion(userId: string, courseId: string) {
    // Mock completion calculation
    const progress = mockProgress.find(p => p.courseId === courseId);
    return progress ? progress.progress : 0;
  }
}; 