import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <AppBar position="fixed" color="inherit" elevation={1}>
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              textDecoration: 'none', 
              color: 'primary.main', 
              fontWeight: 800,
              letterSpacing: -0.5
            }}
          >
            TaskPlanet
          </Typography>

          <Box display="flex" alignItems="center" gap={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                {user?.username?.[0]?.toUpperCase()}
              </Avatar>
              <Typography variant="subtitle2" fontWeight={600} sx={{ display: { xs: 'none', sm: 'block' } }}>
                {user?.username}
              </Typography>
            </Box>
            <Button 
              onClick={handleLogout} 
              color="inherit" 
              size="small"
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
