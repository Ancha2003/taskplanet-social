import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Link, 
  Alert,
  CircularProgress
} from '@mui/material';
import api from '../api';
import { useAuth } from '../App';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const response = await api.post('/api/auth/login', { email, password });
        login(response.data);
      } else {
        await api.post('/api/auth/signup', { username, email, password });
        setIsLogin(true);
        setError('Account created! Please login.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8}>
        <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" color="primary" fontWeight={800} gutterBottom>
            TaskPlanet
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </Typography>

          {error && <Alert severity={error.includes('created') ? 'success' : 'error'} sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            {!isLogin && (
              <TextField
                fullWidth
                label="Username"
                margin="normal"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            )}
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : (isLogin ? 'Login' : 'Sign Up')}
            </Button>
          </form>

          <Link
            component="button"
            variant="body2"
            onClick={() => setIsLogin(!isLogin)}
            sx={{ mt: 1 }}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </Link>
        </Paper>
      </Box>
    </Container>
  );
}
