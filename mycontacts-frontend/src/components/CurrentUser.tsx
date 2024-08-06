import React, { useState } from 'react';
import { getCurrentUser, User } from '../Api';

interface CurrentUserProps {
  token: string;
}

const CurrentUser: React.FC<CurrentUserProps> = ({ token }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleGetCurrentUser = async () => {
    try {
      const user = await getCurrentUser(token);
      setCurrentUser(user);
      console.log('Current user:', user);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  return (
    <div className="current-user-section">
      <h2>Current User</h2>
      <button onClick={handleGetCurrentUser}>Get Current User</button>
      {currentUser && (
        <div>
          <p>Username: {currentUser.username}</p>
          <p>Email: {currentUser.email}</p>
        </div>
      )}
    </div>
  );
};

export default CurrentUser;
