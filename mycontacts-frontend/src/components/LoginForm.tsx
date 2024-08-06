import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Api';

interface LoginProps {
  setToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const { accessToken } = await loginUser({ email, password });
      setToken(accessToken);
      navigate('/current-user'); // Redirect to the current user page
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };

  return (
    <div className="form-section">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value={"Login"}></input> {/* Change to submit type */}
      </form>
    </div>
  );
};

export default Login;
