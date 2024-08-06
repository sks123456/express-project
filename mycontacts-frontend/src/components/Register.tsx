import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Api';
import Modal from './Modal'; // Import the modal component

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      await registerUser({ username, email, password });
      setModalVisible(true); // Show the modal on successful registration
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    navigate('/login'); // Redirect to login after closing the modal
  };

  return (
    <div className="form-section">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Register
        </button>
      </form>
      {modalVisible && (
        <Modal message="You have successfully registered!" onClose={closeModal} />
      )}
    </div>
  );
};

export default Register;
