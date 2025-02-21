import React from 'react';
import { Flex, Link, Box, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      padding="1rem"
      bg="teal.500"
      color="white"
    >
      {/* Left Side (Empty for now) */}
      <Box>
        {/* Add logo or other elements here */}
      </Box>

      {/* Center Links */}
      <Flex gap="2rem" mx="auto">
        <Link as={RouterLink} to="/contact" fontSize="lg" fontWeight="bold">
          Contact
        </Link>
        <Link as={RouterLink} to="/reserve" fontSize="lg" fontWeight="bold">
          Reserve
        </Link>
        <Link as={RouterLink} to="/about" fontSize="lg" fontWeight="bold">
          About
        </Link>
        <Link as={RouterLink} to="/gallery" fontSize="lg" fontWeight="bold">
          Gallery
        </Link>
      </Flex>

      {/* Right Side (Empty for now) */}
      <Spacer />
    </Flex>
  );
};

export default Navbar;