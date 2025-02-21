import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const ContactPage: React.FC = () => {
  return (
    <Box textAlign="center" py={10}>
      <Heading as="h1" size="2xl" mb={4}>
        Contact Us
      </Heading>
      <Text fontSize="lg" color="gray.600">
        Reach out to us at contact@example.com for any inquiries.
      </Text>
    </Box>
  );
};

export default ContactPage;