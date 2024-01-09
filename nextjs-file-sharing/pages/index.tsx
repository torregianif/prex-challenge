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
      router.replace('/dashboard');
    }
  }, [user, router]);

  const handleLogin = () => {
    router.replace('/dashboard');
  };

  const handleRegister = () => {
    router.replace('/dashboard');
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to Next.js File Sharing App</h1>
      <h2>Login</h2>
      <LoginForm onLogin={handleLogin} />
      <h2>Register</h2>
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default HomePage;
