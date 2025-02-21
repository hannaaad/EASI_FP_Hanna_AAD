import React from 'react';
import  { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/homePage';
import AboutPage from './pages/aboutPage';
import ContactPage from './pages/contactPage';
// import ReservePage from './pages/reservePage';
// import GalleryPage from './pages/galleryPage';

const App: React.FC = () => {
  return (
      <Router>
        <Box>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* <Route path="/reserve" element={<ReservePage />} />
            <Route path="/gallery" element={<GalleryPage />} /> */}
          </Routes>
        </Box>
      </Router>
  );
};

export default App;