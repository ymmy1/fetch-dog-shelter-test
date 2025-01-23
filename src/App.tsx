import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import Favorites from './pages/Favorites.tsx';

const App: React.FC = () => {
  const isAuthenticated = false; // Replace this with real auth logic

  return (
    <Router basename='/fetch-dog-shelter-test'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          element={isAuthenticated ? <Home /> : <Navigate to='/login' />}
        />
        <Route
          path='/favorites'
          element={isAuthenticated ? <Favorites /> : <Navigate to='/login' />}
        />
        <Route
          path='*'
          element={<Navigate to={isAuthenticated ? '/' : '/login'} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
