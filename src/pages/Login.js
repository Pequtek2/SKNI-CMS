import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Do przekierowania po zalogowaniu
import { API_URL } from '../config';
import '../App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    axios.post(`${API_URL}/login.php`, { username, password })
      .then(response => {
        if (response.data.success) {
          // Zapisz użytkownika w pamięci przeglądarki
          localStorage.setItem('user', JSON.stringify(response.data.user));
          // Przekieruj do panelu redaktora
          navigate('/editor');
          // Opcjonalnie: odśwież stronę, żeby zaktualizować menu
          window.location.reload(); 
        } else {
          setError(response.data.message);
        }
      })
      .catch(err => setError("Błąd połączenia z serwerem"));
  };

  return (
    <div className="page-container">
      <div className="login-box">
        <h2>Logowanie</h2>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Login (admin)" 
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="form-input"
          />
          <input 
            type="password" 
            placeholder="Hasło (admin123)" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="btn-primary">Zaloguj się</button>
        </form>
      </div>
    </div>
  );
}

export default Login;