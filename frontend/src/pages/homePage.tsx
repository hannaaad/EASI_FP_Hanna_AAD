import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import ImageCarousel from '../components/Carousel';

const HomePage: React.FC = () => {
  const images = [
    'https://via.placeholder.com/800x400?text=Stadium+1',
    'https://via.placeholder.com/800x400?text=Stadium+2',
    'https://via.placeholder.com/800x400?text=Stadium+3',
  ];

  return (
    <Box>
      {/* Carousel Section */}
      <Box position="relative" width="100%" overflow="hidden">
        <ImageCarousel images={images} />
      </Box>

      {/* Welcome Section */}
      <Box textAlign="center" py={10}>
        <Heading as="h1" size="2xl" mb={4}>
          Welcome to Our Stadium
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Experience the thrill of sports and the beauty of our world-class facilities.
        </Text>
      </Box>
    </Box>
  );
};

export default HomePage;