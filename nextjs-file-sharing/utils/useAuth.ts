import { useState, useEffect } from 'react';
import axios from 'axios'; 

type User = {
  id: string;
  username: string;
};

type AuthResponse = {
  message: string;
  user?: User;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for a logged-in user in localStorage when the component mounts
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const response = await axios.post<AuthResponse>('/api/login', {
        username,
        password,
      });

      const { user: userData } = response.data;
      setUser(userData || null);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const register = async (username: string, password: string): Promise<void> => {
    try {
      const response = await axios.post<AuthResponse>('/api/register', {
        username,
        password,
      });

      const { user: userData } = response.data;
      setUser(userData || null);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return {
    user,
    login,
    register,
    logout,
  };
};
