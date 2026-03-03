import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import '../App.css';

function Editor() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Stan formularza
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    // Sprawdź, czy ktoś jest zalogowany
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else {
      // Jak nie zalogowany, wywal do logowania
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!user) return;

    const newPost = {
      title,
      content,
      image_url: imageUrl,
      is_featured: isFeatured,
      author_id: user.id
    };

    axios.post(`${API_URL}/add_post.php`, newPost)
      .then(res => {
        if(res.data.success) {
          alert('Wpis dodany!');
          // Wyczyść formularz
          setTitle('');
          setContent('');
          setImageUrl('');
        } else {
          alert('Błąd: ' + res.data.message);
        }
      });
  };

  if (!user) return null;

  return (
    <div className="page-container">
      <h1>Panel Redaktora</h1>
      <p>Witaj, {user.username}! Dodaj nowy wpis.</p>
      
      <form onSubmit={handleSubmit} className="editor-form">
        <label>Tytuł wpisu:</label>
        <input 
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          required 
          className="form-input"
        />

        <label>Link do obrazka (URL):</label>
        <input 
          type="text" 
          value={imageUrl} 
          onChange={e => setImageUrl(e.target.value)} 
          placeholder="np. https://imgur.com/..."
          className="form-input"
        />

        <label>Treść wpisu (możesz używać znaczników &lt;b&gt;, &lt;p&gt; itp):</label>
        <textarea 
          value={content} 
          onChange={e => setContent(e.target.value)} 
          required 
          rows="10"
          className="form-input"
        />

        <div className="checkbox-group">
          <input 
            type="checkbox" 
            checked={isFeatured} 
            onChange={e => setIsFeatured(e.target.checked)} 
          />
          <label> Wyróżnij na Stronie Głównej</label>
        </div>

        <button type="submit" className="btn-primary">Opublikuj wpis</button>
      </form>
    </div>
  );
}

export default Editor;