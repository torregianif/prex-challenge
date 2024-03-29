import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../utils/useAuth';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/uploadDashboard');
    }
  }, [user, router]);

  const handleLogin = () => {
    router.replace('/uploadDashboard');
  };

  const handleRegister = () => {
    router.replace('/uploadDashboard');
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to Next.js File Sharing App</h1>
      <LoginForm onLogin={handleLogin} />
      <h2>OR</h2>
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default HomePage;
