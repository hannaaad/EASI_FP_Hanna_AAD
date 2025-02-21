import React, { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import { fetchScholarships, Scholarship } from "../services/ScholarshipsServices"; // Import service
import useAxiosAuth from "../hooks/useAxiosAuth";


const ScholarshipsPage: React.FC = () => {  
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const axiosInstance = useAxiosAuth("admin", "password");

  useEffect(() => {
    const getScholarships = async () => {
      try {
        const data = await fetchScholarships(axiosInstance);
        setScholarships(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch scholarships",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    getScholarships();
  }, [toast]);

  return (
    <Box p={5}>
      <Heading as="h1" mb={8} textAlign="center">
        Scholarships
      </Heading>

      {loading ? (
        <Text textAlign="center">Loading scholarships...</Text>
      ) : (
        <ul>
          {scholarships.map((scholarship, index) => (
            <li key={index} style={{ display: "inline-block", width: "50%" }}>
              <Box
                as="button"
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
                onClick={() => {
                  const element = document.getElementById(`scholarship-${index}`);
                  if (element) {
                    element.style.display = element.style.display === "none" ? "block" : "none";
                  }
                }}
                width="100%"
                mb={4}
                display="block"
                mr={2}
              >
                <SimpleGrid columns={1} spacing={4}>
                  <Box>
                    <Text fontSize="xl" fontWeight="bold">
                      {scholarship.name}
                    </Text>
                  </Box>
                  <Box>
                    <Box id={`scholarship-${index}`} display="none" mt={4} maxHeight="200px" overflowY="auto">
                      <Text fontSize="md" color="gray.600">
                        {scholarship.description}
                      </Text>
                      <Text fontSize="md" color="gray.600" mt={2}>
                        Duration: {scholarship.duration} months
                      </Text>
                    </Box>
                  </Box>
                </SimpleGrid>
              </Box>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default ScholarshipsPage;
