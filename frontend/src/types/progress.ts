export interface Progress {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  completedModules: number;
  timeSpent: number;
  quizScore: number;
  lastAccessed?: Date;
  course: {
    id: string;
    title: string;
    description?: string;
    instructor?: string;
  };
} 