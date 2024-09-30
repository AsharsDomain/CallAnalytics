import { Box, Flex, Heading, Text, Input, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import Header from "@/components/Header"; // Adjust the import path as necessary
import Sidebar from "@/components/Sidebar"; // Adjust the import path as necessary

const SettingsPage = ({ instagramUrl, setInstagramUrl, linkedinUrl, setLinkedinUrl }) => {

  const handleSave = () => {
    // Check if the URLs start with 'http://' or 'https://'
    const formattedInstagramUrl = instagramUrl.startsWith("http://") || instagramUrl.startsWith("https://") 
      ? instagramUrl 
      : `https://${instagramUrl}`;

    const formattedLinkedinUrl = linkedinUrl.startsWith("http://") || linkedinUrl.startsWith("https://") 
      ? linkedinUrl 
      : `https://${linkedinUrl}`;

    localStorage.setItem("instagramUrl", formattedInstagramUrl);
    localStorage.setItem("linkedinUrl", formattedLinkedinUrl);
    
    alert("URLs saved successfully!");
  };

  return (
    <Box>
      <Flex direction="row">
        <Sidebar />
        <Box p={6} flex="1" bg="gray.800">
          <Heading as="h1" size="lg" mb={4} color="blue.400">Settings</Heading>
          <Text color="white">You can customize your social media URLs here:</Text>
          
          <Flex direction="column" mt={4}>
            <Text color="white" mb={2}>Instagram URL:</Text>
            <Input 
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              placeholder="Enter Instagram URL"
              mb={4}
              bg="gray.700" 
              color="white"
            />

            <Text color="white" mb={2}>LinkedIn URL:</Text>
            <Input 
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="Enter LinkedIn URL"
              mb={4}
              bg="gray.700" 
              color="white"
            />

            <Button onClick={handleSave} colorScheme="blue">Save URLs</Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default SettingsPage;
