import { useEffect, useState } from 'react';
import { Box, Image, IconButton, Flex } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  // Automatically cycle through images
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  // Go to the previous image
  const goToPrevious = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Go to the next image
  const goToNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <Box position="relative" width="100%" height="400px" overflow="hidden">
      {/* Image */}
      <Image
        src={images[index]}
        alt={`Image ${index + 1}`}
        width="100%"
        height="100%"
        objectFit="cover"
        transition="opacity 0.5s ease-in-out"
      />

      {/* Navigation Buttons */}
      <Flex
        position="absolute"
        top="50%"
        left="0"
        right="0"
        transform="translateY(-50%)"
        justify="space-between"
        padding="0 1rem"
      >
        <IconButton
          aria-label="Previous image"
          icon={<ChevronLeftIcon />}
          onClick={goToPrevious}
          size="lg"
          borderRadius="full"
          bg="rgba(0, 0, 0, 0.5)"
          color="white"
          _hover={{ bg: 'rgba(0, 0, 0, 0.7)' }}
        />
        <IconButton
          aria-label="Next image"
          icon={<ChevronRightIcon />}
          onClick={goToNext}
          size="lg"
          borderRadius="full"
          bg="rgba(0, 0, 0, 0.5)"
          color="white"
          _hover={{ bg: 'rgba(0, 0, 0, 0.7)' }}
        />
      </Flex>
    </Box>
  );
};

export default ImageCarousel;