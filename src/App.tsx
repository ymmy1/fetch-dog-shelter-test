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

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
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
  );
};

export default App;
