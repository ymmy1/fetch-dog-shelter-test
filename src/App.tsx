import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

const App: React.FC = () => {
  const isAuthenticated = false; // Replace with real auth logic

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
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </Router>
  );
};

export default App;
