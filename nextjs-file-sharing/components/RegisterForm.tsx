import { useState } from 'react';
import { useAuth } from '../utils/useAuth';

interface RegisterFormProps {
  onRegister?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(username, password);
      setUsername('');
      setPassword('');

      // Trigger callback on successful registration if provided
      if (onRegister) {
        onRegister();
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration error (e.g., display error message to the user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
