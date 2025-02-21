import React, {useEffect, useState} from "react";
import {Box, Button, Center, Heading, Image, SimpleGrid, Spinner, Text, useToast} from "@chakra-ui/react";
import Slider from "react-slick";
import {useAxios} from "../hooks/useAxiosAuth";
import {Country, fetchCountries, fetchUniversities, University} from "../services/UniversityService.tsx";
import {fetchProgramsByUniversity} from "../services/ProgramService.tsx";
import {fetchConvention} from "../services/FileService.tsx";

const UniversityPage: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [countries, setCountries] = useState<Country[]>([]);
    const [universities, setUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [programs, setPrograms] = useState<{ [key: number]: any[] }>({}); // Store programs by university ID
    const [loadingPrograms, setLoadingPrograms] = useState<boolean>(false); // Loading state for programs
    const toast = useToast();
    const axiosInstance = useAxios();
    // State to show the programs of each university (key: uniId, value: show or not)
    const [showPrograms, setShowPrograms] = useState<{ [key: number]: boolean }>({});


    useEffect(() => {
        const loadData = async () => {
            try {
                console.log("📡 Fetching countries...");
                const countriesData = await fetchCountries(axiosInstance);
                setCountries(countriesData);

                console.log("📡 Fetching universities...");
                const universitiesData = await fetchUniversities(axiosInstance);
                setUniversities(universitiesData);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to load data",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [axiosInstance, toast]);

    const handleFlagClick = (country: Country) => {
        setSelectedCountry(country); // Toggle selection

        toast({
            title: `Showing universities from ${country.code}`,
            status: "info",
            duration: 2000,
            isClosable: true,
        });
    };

    const handleUniversityClick = async (uniId: number) => {
        // const element = document.getElementById(`uni-${uniId}`);
        // if (element) {
        // Toggle visibility
        // element.style.display = element.style.display === "none" ? "block" : "none";
        setShowPrograms((prevStates) => ({
            ...prevStates,
            [uniId]: !prevStates[uniId], // Toggle clicked state for this component
        }));
        // Fetch programs if not already fetched
        if (!programs[uniId]) {
            setLoadingPrograms(true);
            try {
                const programData = await fetchProgramsByUniversity(axiosInstance, uniId);
                setPrograms((prev) => ({...prev, [uniId]: programData}));
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch programs",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setLoadingPrograms(false);
            }
        }
        // }
    };

    const filteredUniversities = selectedCountry
        ? universities.filter((uni: University) => uni.country.code === selectedCountry.code)
        : universities;

    return (
        <Box p={5}>
            <Heading as="h1" mb={8} textAlign="center">
                Universities by Country
            </Heading>

            {loading ? (
                <Center>
                    <Spinner size="xl"/>
                </Center>
            ) : (
                <>
                    <Box mb={10}>
                        <Slider dots infinite speed={500} slidesToShow={3} slidesToScroll={1}>
                            {countries.map((country: Country) => (
                                <Center
                                    key={country.code}
                                    onClick={() => handleFlagClick(country)}
                                    cursor="pointer"
                                    p={4}
                                    border={selectedCountry?.code === country.code ? "2px solid teal" : "none"}
                                    borderRadius="md"
                                    _hover={{bg: "gray.100"}}
                                >
                                    <Image
                                        src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                                        alt={country.name}
                                        boxSize="50px"
                                        mb={2}
                                    />
                                    <Text fontWeight="bold">{country.name}</Text>
                                </Center>
                            ))}
                        </Slider>
                    </Box>

                    <Box maxHeight="1000px" overflowY="auto">  {/* Set a fixed height and enable scroll */}
                        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={6}>
                            {filteredUniversities.length > 0 ? (
                                filteredUniversities.map((uni: University) => (
                                    <Box
                                        key={uni.id}
                                        p={5}
                                        borderWidth="1px"
                                        borderRadius="lg"
                                        boxShadow="md"
                                        _hover={{boxShadow: "lg"}}
                                        onClick={() => handleUniversityClick(uni.id)}
                                        height={showPrograms[uni.id] ? "auto" : "fit-content"} // Dynamically adjust height
                                    >
                                        {uni.logoUrl ? (
                                            <Image src={uni.logoUrl} alt={uni.name} boxSize="100px" mx="auto" mb={4}/>
                                        ) : (
                                            <Box boxSize="100px" mx="auto" mb={4} bg="gray.200" borderRadius="md"/>
                                        )}
                                        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                                            {uni.name}
                                        </Text>
                                        {showPrograms[uni.id] && (
                                            <Box id={`uni-${uni.id}`} mt={4} maxHeight="200px" overflowY="auto">
                                                {loadingPrograms ? (
                                                    <Center>
                                                        <Spinner size="sm"/>
                                                    </Center>
                                                ) : (
                                                    programs[uni.id]?.map((program, index) => (
                                                        <Box key={index} mb={4}>
                                                            <Text fontSize="lg" fontWeight="bold" color="blue.600">
                                                                Program {index + 1}
                                                            </Text>
                                                            <Text fontSize="md" color="gray.600">
                                                                <strong>Description:</strong> {program.description}
                                                            </Text>
                                                            <Text fontSize="md" color="gray.600">
                                                                <strong>Department:</strong> {program.department}
                                                            </Text>
                                                            <Text fontSize="md" color="gray.600">
                                                                <strong>Type:</strong> {program.type}
                                                            </Text>
                                                            <Text fontSize="md" color="gray.600">
                                                                <strong>Submission Due
                                                                    Date:</strong> {program.submissionDueDate}
                                                            </Text>
                                                            <Text fontSize="md" color="gray.600">
                                                                <strong>Academic Year:</strong> {program.academicYear}
                                                            </Text>
                                                        </Box>
                                                    ))
                                                )}
                                            </Box>
                                        )}
                                        <Button onClick={
                                            async (event) => {
                                                event.stopPropagation()
                                                await fetchConvention(axiosInstance, uni.convention.id);
                                            }
                                        }>
                                            Download Convention
                                        </Button>
                                    </Box>
                                ))
                            ) : (
                                <Text textAlign="center" fontSize="lg" color="gray.500">
                                    No universities found.
                                </Text>
                            )}
                        </SimpleGrid>
                    </Box>


                </>
            )}
        </Box>
    );
};

export default UniversityPage;