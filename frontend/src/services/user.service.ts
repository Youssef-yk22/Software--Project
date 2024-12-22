import api from './api';

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  bio: 'Passionate learner interested in web development and data science.'
};

export const userService = {
  async getProfile() {
    return mockUser;
  },

  async updateProfile(data: Partial<typeof mockUser>) {
    return {
      ...mockUser,
      ...data
    };
  }
}; 