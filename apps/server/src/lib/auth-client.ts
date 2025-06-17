import { auth } from './auth';

export const authClient = {
  getSession: async () => {
    const response = await auth.api.ok();
    if (!response.ok) return null;
    return response.data;
  },
}; 