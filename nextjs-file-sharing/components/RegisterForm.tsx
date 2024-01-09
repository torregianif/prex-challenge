import { useState } from 'react';
import { useAuth } from '../utils/useAuth';
import styles from '../styles/Form.module.css'; 

interface RegisterFormProps {
  onRegister?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
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
    <>
    <div className={styles.formContainer}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.submitButton}>Register</button>
      </form>
    </div>
    </>
    
    
  );
};

export default RegisterForm;
