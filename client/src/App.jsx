import './App.css';

// Context
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';

// React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import ToastContainer from './components/Toaster/ToastContainer';

// Pages
import HomePage from './pages/HomePage';

import ExplorePage from './pages/listings/ExplorePage';
import ShowPage from './pages/listings/ShowPage';
import AddPage from './pages/listings/AddPage';
import EditPage from './pages/listings/EditPage';

import LoginPage from './pages/users/LoginPage';
import SignupPage from './pages/users/SignupPage';

import NotFoundPage from './pages/NotFoundPage';


function App() {

  return (
    <>
      <AuthProvider>
        <WishlistProvider>
          <Router>
              <ToastContainer />
              <Routes>
                {/* Home */}
                <Route path="/" element={<HomePage />} />  

                {/* Listing */}
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/show" element={<ShowPage />} />
                <Route path="/add" element={<AddPage />} />
                <Route path="/edit" element={<EditPage />} />

                {/* User */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Not found */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
          </Router>
        </WishlistProvider>
      </AuthProvider>
    </>
  )
}

export default App
