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
    <Router>
      <Routes>
        <Route path='/fetch-dog-shelter-test/login' element={<Login />} />
        <Route
          path='/fetch-dog-shelter-test'
          element={
            isAuthenticated ? (
              <Home />
            ) : (
              <Navigate to='/fetch-dog-shelter-test/login' />
            )
          }
        />
        <Route
          path='/favorites'
          element={
            isAuthenticated ? (
              <Favorites />
            ) : (
              <Navigate to='/fetch-dog-shelter-test/login' />
            )
          }
        />
        <Route
          path='*'
          element={
            <Navigate
              to={isAuthenticated ? '/' : '/fetch-dog-shelter-test/login'}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
