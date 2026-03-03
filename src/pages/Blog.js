import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pobieramy WSZYSTKIE wpisy
    axios.get(`${API_URL}/get_posts.php`)
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Błąd:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Ładowanie wpisów...</div>;

  return (
    <div className="page-container">
      <h1>Aktualności</h1>
      <p>Wszystkie wpisy od najnowszych:</p>
      
      <div className="posts-list">
        {posts.map(post => (
          <article key={post.id} className="blog-row">
            <div className="blog-text">
              <h2>{post.title}</h2>
              <small>Dodał: {post.username} w dniu {new Date(post.created_at).toLocaleDateString()}</small>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Blog;