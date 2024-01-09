import React from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/useAuth'; // Replace with the actual path to your useAuth hook
import styles from '../styles/Navbar.module.css'; // Import CSS module styles

const Navbar: React.FC = () => {
  const { user, logout } = useAuth(); // Assume the useAuth hook provides a logout function

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <span>File Sharing App</span>
      </div>
      <div className={styles.links}>
        <Link href="/uploadDashboard">
          Upload Dashboard
        </Link>
        <Link href="/viewDashboard">
          View Dashboard
        </Link>
        {user ? (
            <button className={styles.button} onClick={logout}>Logout</button>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
