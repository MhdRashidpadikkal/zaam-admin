import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Admin {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export const useAuth = () => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate checking for existing session
    const savedAdmin = localStorage.getItem('zaam_admin');
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    if (email === 'admin@zaam.com' && password === 'admin123') {
      const adminData = {
        id: '1',
        name: 'Admin User',
        email: 'admin@zaam.com',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      };
      setAdmin(adminData);
      localStorage.setItem('zaam_admin', JSON.stringify(adminData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('zaam_admin');
    navigate('/login');
  };

  return {
    admin,
    loading,
    login,
    logout,
    isAuthenticated: !!admin
  };
};