import React, { useState } from 'react';
import { Paper, Box, Avatar, TextField, Button, IconButton, CircularProgress } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import api from '../api';
import { useAuth } from '../App';

export default function CreatePost({ onPostCreated }: { onPostCreated: (post: any) => void }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, showToast } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !image.trim()) return;

    setLoading(true);
    try {
      const response = await api.post('/api/posts', { text, image });
      onPostCreated(response.data);
      setText('');
      setImage('');
      showToast('Post shared successfully!', 'success');
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to share post', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box display="flex" gap={2}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>{user?.username?.[0]?.toUpperCase()}</Avatar>
        <Box flex={1}>
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder={`What's on your mind, ${user?.username}?`}
            variant="standard"
            InputProps={{ disableUnderline: true }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mb: 1 }}
          />
          
          {image && (
            <Box mt={1} mb={1} borderRadius={1} overflow="hidden">
              <img src={image} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }} />
            </Box>
          )}

          <Box display="flex" justifyContent="space-between" alignItems="center" pt={1} borderTop="1px solid #eee">
            <Box display="flex" gap={1}>
              <TextField
                size="small"
                placeholder="Image URL (optional)"
                variant="outlined"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                sx={{ width: 200 }}
              />
            </Box>
            <Button
              variant="contained"
              disabled={loading || (!text.trim() && !image.trim())}
              onClick={handleSubmit}
              endIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
