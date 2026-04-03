import React, { useState, useEffect } from 'react';
import { Container, Box, CircularProgress, Typography, Alert } from '@mui/material';
import api from '../api';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await api.get('/api/posts');
      setPosts(response.data);
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost: any) => {
    setPosts([newPost, ...posts]);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <CreatePost onPostCreated={handlePostCreated} />
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box display="flex" flexDirection="column" gap={2}>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
        {posts.length === 0 && (
          <Box textAlign="center" py={4} bgcolor="white" borderRadius={2}>
            <Typography color="text.secondary">No posts yet. Be the first to share!</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}
