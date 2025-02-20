import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react'; // Removed extendTheme
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import AboutPage from './pages/aboutPage';
import ContactPage from './pages/contactPage';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Router>
        <Box>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;