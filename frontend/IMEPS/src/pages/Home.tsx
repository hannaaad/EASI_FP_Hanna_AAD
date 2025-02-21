import React, {useState} from "react";

// Import images
import facdep from "../assets/facdep.jpg";
import elecdep from "../assets/elecdep.jpg";
import mecadep from "../assets/mecadep.jpg";
import civdep from "../assets/civdep.jpg";
import petrodep from "../assets/petrodep.jpg";
import ImageCarousel from "../components/ImageCarousel.tsx";
import {Box, Center, Container, Heading, Text} from "@chakra-ui/react";

const Home: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        facdep,
        elecdep,
        mecadep,
        civdep,
        petrodep,
    ];


    return (
        <Center>
            <Box height={"100vh"}>
                <ImageCarousel images={images}/>
            </Box>
                <Container w="75%" color="black">
                    <Heading as="h1" size="2xl" fontWeight="bold" mb={4}>
                        Welcome to the ULFG Portal
                    </Heading>
                    <Text fontSize="xl" fontWeight="medium" color="gray.600">
                        Explore our platform to find universities and available scholarships.
                    </Text>
                </Container>
        </Center>
    );
};

export default Home;
