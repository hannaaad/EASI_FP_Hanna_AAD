import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const AboutPage: React.FC = () => {
  return (
    <Box textAlign="center" py={10}>
      <Heading as="h1" size="2xl" mb={4}>
        About Us
      </Heading>
      <Text fontSize="lg" color="gray.600">
        We are a team of passionate developers building amazing web applications.
      </Text>
    </Box>
  );
};

export default AboutPage;