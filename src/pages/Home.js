import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import '../App.css'; // Użyjemy wspólnych stylów

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pobieramy tylko wyróżnione wpisy
    axios.get(`${API_URL}/get_posts.php?featured=true`)
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Błąd pobierania:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Ładowanie strony...</div>;

  return (
    <div className="page-container">
      {/* Hero Section - nagłówek z tłem */}
      <header className="hero">
        <div className="hero-content">
          <h1>CodeHoryzont</h1>
          <p>Oficjalna strona naszego koła informatycznego.</p>
        </div>
      </header>

      <section className="featured-section">
        <h2>Wyróżnione wpisy</h2>
        
        {posts.length === 0 ? (
          <p>Brak wyróżnionych wpisów.</p>
        ) : (
          <div className="posts-grid">
            {posts.map(post => (
              <div key={post.id} className="post-card">
                {post.image_url && <img src={post.image_url} alt={post.title} className="post-img" />}
                <div className="post-content">
                  <h3>{post.title}</h3>
                  <small>Autor: {post.username} | {new Date(post.created_at).toLocaleDateString()}</small>
                  {/* Skrót treści (renderowanie HTML) */}
                  <div className="post-excerpt" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 100) + '...' }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;