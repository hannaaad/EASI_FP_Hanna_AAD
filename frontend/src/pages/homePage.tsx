import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Sample data for carousel images and quotes
const carouselItems = [
  {
    image: 'https://via.placeholder.com/800x400?text=Stadium+1',
    quote: '“The only way to prove you are a good sport is to lose.” – Ernie Banks',
  },
  {
    image: 'https://via.placeholder.com/800x400?text=Stadium+2',
    quote: '“It’s not whether you get knocked down, it’s whether you get up.” – Vince Lombardi',
  },
  {
    image: 'https://via.placeholder.com/800x400?text=Stadium+3',
    quote: '“Hard work beats talent when talent doesn’t work hard.” – Tim Notke',
  },
];

const HomePage: React.FC = () => {
  // Settings for the carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <Box>
      {/* Carousel Section */}
      <Box position="relative" width="100%" overflow="hidden">
        <Slider {...settings}>
          {carouselItems.map((item, index) => (
            <Box key={index} position="relative" height="400px">
              <Box
                backgroundImage={`url(${item.image})`}
                backgroundSize="cover"
                backgroundPosition="center"
                height="100%"
                width="100%"
              />
              <Box
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                bg="rgba(0, 0, 0, 0.5)"
                color="white"
                p={4}
                textAlign="center"
              >
                <Text fontSize="xl" fontStyle="italic">
                  {item.quote}
                </Text>
              </Box>
            </Box>
          ))}
        </Slider>
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