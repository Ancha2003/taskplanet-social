import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate
} from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import Auth from './pages/Auth';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1877f2', // Facebook-like blue
    },
    background: {
      default: '#f0f2f5',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

interface ToastState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

interface AuthContextType {
  user: any | null;
  login: (userData: any) => void;
  logout: () => void;
  loading: boolean;
  showToast: (message: string, severity?: 'success' | 'error' | 'info' | 'warning') => void;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  login: () => {}, 
  logout: () => {}, 
  loading: true,
  showToast: () => {}
});

export const useAuth = () => useContext(AuthContext);

export default function App() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: any) => {
    setUser(userData.user);
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('token', userData.token);
    showToast('Logged in successfully!', 'success');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    showToast('Logged out successfully!', 'info');
  };

  const showToast = (message: string, severity: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContext.Provider value={{ user, login, logout, loading, showToast }}>
        <Router>
          <Box minHeight="100vh">
            {user && <Navbar />}
            <Box pt={user ? 8 : 0} pb={4}>
              <Routes>
                <Route path="/" element={user ? <Feed /> : <Navigate to="/auth" />} />
                <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
              </Routes>
            </Box>
          </Box>
        </Router>
        <Snackbar 
          open={toast.open} 
          autoHideDuration={4000} 
          onClose={handleCloseToast}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%' }}>
            {toast.message}
          </Alert>
        </Snackbar>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}
