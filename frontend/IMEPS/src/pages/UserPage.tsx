import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Spinner,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import useAxiosAuth from "../hooks/useAxiosAuth";
import {fetchUniversities, University} from "../services/UniversityService.tsx";
import {fetchProgramsByUniversity, Program} from "../services/ProgramService";
import {useUser} from "../services/UserService.tsx";
import {fetchScholarships, Scholarship} from "../services/ScholarshipService.tsx";
import {postProgramStudent, postScholarshipStudent} from "../services/StudentsService.tsx";

export default function UserPage() {
    const [universities, setUniversities] = useState<University[]>([]);
    const [programs, setPrograms] = useState<Program[]>([]);
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);
    const [selectedUniversity, setSelectedUniversity] = useState<University>(null);
    const [selectedProgram, setSelectedProgram] = useState<Program>(null);
    const [selectedScholarship, setSelectedScholarship] = useState<Scholarship>(null);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const toast = useToast();
    const {user, setUser} = useUser();
    const axiosInstance = useAxiosAuth(user!.username, user!.password);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };
    const getUniversities = async () => {
        try {
            const universityData = await fetchUniversities(axiosInstance);
            setUniversities(universityData);
        } catch (error) {
            toast({
                title: "Error fetching data",
                description: "Unable to fetch universities. Please try again later.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const getPrograms = async () => {
        try {
            const programsData = await fetchProgramsByUniversity(axiosInstance, selectedUniversity.id);
            setPrograms(programsData);
        } catch (error) {
            toast({
                title: "Error fetching data",
                description: "Unable to fetch programs. Please try again later.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const getScholarships = async () => {
        try {
            const scholarshipData = await fetchScholarships(axiosInstance);
            setScholarships(scholarshipData);
        } catch (error) {
            toast({
                title: "Error fetching data",
                description: "Unable to fetch scholarship. Please try again later.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };


    const handleUniversityChange = (e) => {
        const selectedUniversityId = e.target.value;
        // Find the full university object based on the selected ID
        const university: University = universities.find((uni) => uni.id == selectedUniversityId)!;
        setSelectedUniversity(university);
    };

    const handleProgramChange = (e) => {
        const selectedProgramId = e.target.value;
        const program: Program = programs.find((p) => p.id == selectedProgramId)!;
        setSelectedProgram(program);
        console.log(selectedProgram)
    };

    const handleScholarshipChange = (e) => {
        const selectedScholarshipId = e.target.value;
        if (selectedScholarshipId === 0)
            setSelectedScholarship(null);
        else {

            const scholarship: Scholarship = scholarships.find((s) => s.id == selectedScholarshipId)!;
            setSelectedScholarship(scholarship);
            console.log(selectedScholarship)
        }
    }

    useEffect(() => {
        getUniversities();
    }, [axiosInstance, toast]);

    useEffect(() => {
        if (selectedUniversity != null)
            getPrograms();
    }, [selectedUniversity]);

    useEffect(() => {
        getScholarships();
    }, [selectedScholarship]);

    // Handle form submission
    const handleSubmit = async () => {
        if (!selectedUniversity || !selectedProgram) {
            toast({
                title: "Incomplete form",
                description: "Please fill out all fields and upload a file.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        setIsSubmitting(true);
        try {
            await postProgramStudent(axiosInstance, user!.id, selectedProgram!.id)
            await postScholarshipStudent(axiosInstance, user!.id, selectedScholarship!.id)

            // Handle success
            toast({
                title: "Application submitted",
                description: "Your application has been submitted successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            // Reset form fields
            setSelectedUniversity(null);
            setSelectedProgram(null);
            setFile(null);
        } catch (error) {
            console.error("Error submitting application:", error);
            toast({
                title: "Error",
                description: "Failed to submit application. Please try again later.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
            setFile(null);
            setSelectedScholarship(null);
            setSelectedProgram(null);
            setSelectedUniversity(null);
        }
    };

    return (
        <Center minH="100vh" bg="gray.100">
            <Box bg="white" p={6} shadow="md" borderRadius="lg" w="full" maxW="400px">
                <Heading as="h2" size="lg" textAlign="center" mb={4}>
                    Student Submission Form
                </Heading>

                {loading ? (
                    <Center>
                        <Spinner size="lg"/>
                    </Center>
                ) : (
                    <VStack spacing={4}>
                        {/* University Selection */}
                        <FormControl>
                            <FormLabel>University</FormLabel>
                            <Select
                                placeholder="Select University"
                                value={selectedUniversity ? selectedUniversity.id : ""}
                                onChange={handleUniversityChange}
                            >
                                {universities.map((uni) => (
                                    <option key={uni.id} value={uni.id}>
                                        {uni.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Program Selection */}
                        <FormControl isDisabled={!selectedUniversity}>
                            <FormLabel>Program</FormLabel>
                            <Select
                                placeholder="Select Program"
                                value={selectedProgram ? selectedProgram.id : ""}
                                onChange={handleProgramChange}
                            >
                                {programs.map((program) => (
                                    <option key={program.id} value={program.id}>
                                        {program.description}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Scholarship Selection */}
                        <FormControl isDisabled={!selectedProgram}>
                            <FormLabel>Scholarship</FormLabel>
                            <Select
                                placeholder="Select Scholarship"
                                onChange={handleScholarshipChange}
                            >
                                {scholarships.map((scholarship) => (
                                    <option key={scholarship.id} value={scholarship.id}>
                                        {scholarship.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        {/* File Upload */}
                        <VStack spacing={4} align="stretch">
                            <FormControl>
                                <FormLabel htmlFor="file-upload" fontSize="lg">
                                    Upload Your File
                                </FormLabel>
                                <Input
                                    type="file"
                                    id="file-upload"
                                    display="none"
                                    onChange={handleFileChange}
                                />
                                <Button
                                    as="label"
                                    htmlFor="file-upload"
                                    variant="outline"
                                    colorScheme="blue"
                                    size="lg"
                                    width="full"
                                    leftIcon={<i className="fas fa-upload"></i>}
                                >
                                    Choose File
                                </Button>
                            </FormControl>

                            {file && (
                                <Box>
                                    <Text fontSize="md" fontWeight="bold">
                                        Selected File:
                                    </Text>
                                    <Text>{file.name}</Text>
                                </Box>
                            )}
                        </VStack>

                        {/* Submit Button */}
                        <Button
                            colorScheme="teal"
                            width="full"
                            onClick={handleSubmit}
                            isDisabled={!selectedUniversity || !selectedProgram}
                            isLoading={isSubmitting}
                        >
                            Submit
                        </Button>
                    </VStack>
                )}
            </Box>
        </Center>
    );
}
