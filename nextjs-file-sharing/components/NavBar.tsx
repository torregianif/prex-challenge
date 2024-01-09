import React from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/useAuth';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav>
      <div>
        {user ? (
          <span>Welcome, {user.username}!</span>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
      <div>
        <Link href="/uploadDashboard">
          Upload Dashboard
        </Link>
        <Link href="/viewDashboard">
          View Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
