import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';
import Login from './pages/Login';
import Home from './pages/Home';
import { FavoritesProvider } from './context/FavoritesContext';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <FavoritesProvider>
      <Router basename='/fetch-dog-shelter-test'>
        <Routes>
          <Route
            path='/login'
            element={!isAuthenticated ? <Login /> : <Navigate to='/' />}
          />
          <Route
            path='/'
            element={isAuthenticated ? <Home /> : <Navigate to='/login' />}
          />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
