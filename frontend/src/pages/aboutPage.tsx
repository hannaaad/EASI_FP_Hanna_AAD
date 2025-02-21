import React from "react";
import { Heading, Text, Container } from "@chakra-ui/react";

const AboutPage: React.FC = () => {
  return (
    <Container maxW="container.md" py={10} textAlign="center">
      <Heading as="h1" size="2xl" mb={4}>
        About Us
      </Heading>
      <Text fontSize="lg" color="gray.600" maxW="600px" mx="auto">
        Welcome to our platform! We are dedicated to building innovative and high-performance web applications.
        Our team is passionate about delivering seamless user experiences with cutting-edge technologies.
      </Text>
    </Container>
  );
};

export default AboutPage;
