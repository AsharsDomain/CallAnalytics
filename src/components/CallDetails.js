import { useParams } from 'react-router-dom';
import { Box, Text, Flex, Link, Heading, Divider } from "@chakra-ui/react";
import data from "@/tableData.js"; // Import your mock data
import Header from "@/components/Header"; // Adjust the path as necessary
import Sidebar from "@/components/Sidebar"; // Adjust the path as necessary

const CallDetails = () => {
  const { id } = useParams(); // Get the call ID from the route parameters
  const call = data.find(call => call.call_id === parseInt(id)); // Find the specific call data

  if (!call) {
    return <Text fontSize="xl" color="red.400" textAlign="center">Call not found or loading...</Text>;
  }

  return (
    <Box>
      <Header /> {/* Render Header */}
      <Flex direction="row" justify="flex-start" align="flex-start">
        <Sidebar /> {/* Render Sidebar */}
        <Flex 
          maxW="900px" 
          mx="auto" 
          p={6} 
          bg="gray.800" 
          borderRadius="md" 
          boxShadow="md" 
          mt={8} 
          direction="column" // Stack children vertically
          _hover={{ transform: "scale(1.03)", transition: "transform 0.2s ease-in-out" }} // Add hover effect for the container
        >
          <Heading 
            as="h1" 
            size="lg" 
            color="blue.400" // Change to blue theme font
            mb={4} 
            textAlign="center"
            _hover={{ color: "orange.400", transform: "scale(1.05)", transition: "0.2s ease-in-out" }} // Hover effects
          >
            Call Details for ID: {call.call_id}
          </Heading>

          <Divider my={4} borderColor="gray.600" />

          {/* Caller Information */}
          <Box mb={6} _hover={{ bg: "gray.700" }} p={2} borderRadius="md" transition="background 0.2s ease-in-out">
            <Flex justify="space-between">
              <Text fontWeight="bold" color="gray.400" _hover={{ color: "orange.400", fontSize: "lg" }}>Caller Name:</Text>
              <Text color="white" _hover={{ color: "orange.400", fontSize: "lg" }}>{call.caller_name}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontWeight="bold" color="gray.400" _hover={{ color: "orange.400", fontSize: "lg" }}>Caller Number:</Text>
              <Text color="white" _hover={{ color: "orange.400", fontSize: "lg" }}>{call.caller_number}</Text>
            </Flex>
          </Box>

          {/* Call Information */}
          <Box mb={6} _hover={{ bg: "gray.700" }} p={2} borderRadius="md" transition="background 0.2s ease-in-out">
            <Flex justify="space-between">
              <Text fontWeight="bold" color="gray.400" _hover={{ color: "orange.400", fontSize: "lg" }}>Call Date:</Text>
              <Text color="white" _hover={{ color: "orange.400", fontSize: "lg" }}>{new Date(call.call_date).toLocaleDateString()}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontWeight="bold" color="gray.400" _hover={{ color: "orange.400", fontSize: "lg" }}>Call Time:</Text>
              <Text color="white" _hover={{ color: "orange.400", fontSize: "lg" }}>{new Date(call.call_date).toLocaleTimeString()}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontWeight="bold" color="gray.400" _hover={{ color: "orange.400", fontSize: "lg" }}>Call Duration:</Text>
              <Text color="white" _hover={{ color: "orange.400", fontSize: "lg" }}>{call.call_duration} minutes</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontWeight="bold" color="gray.400" _hover={{ color: "orange.400", fontSize: "lg" }}>Call Cost:</Text>
              <Text color="white" _hover={{ color: "orange.400", fontSize: "lg" }}>${call.call_cost}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontWeight="bold" color="gray.400" _hover={{ color: "orange.400", fontSize: "lg" }}>Outcome:</Text>
              <Text color="white" _hover={{ color: "orange.400", fontSize: "lg" }}>{call.outcome}</Text>
            </Flex>
          </Box>

          {/* Additional Information */}
          <Box mb={6} _hover={{ bg: "gray.700" }} p={2} borderRadius="md" transition="background 0.2s ease-in-out">
            <Flex justify="space-between">
              <Text fontWeight="bold" color="gray.400" _hover={{ color: "orange.400", fontSize: "lg" }}>Call Type:</Text>
              <Text color="white" _hover={{ color: "orange.400", fontSize: "lg" }}>{call.call_type}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontWeight="bold" color="gray.400" _hover={{ color: "orange.400", fontSize: "lg" }}>Location:</Text>
              <Text color="white" _hover={{ color: "orange.400", fontSize: "lg" }}>{call.location}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontWeight="bold" color="gray.400" _hover={{ color: "orange.400", fontSize: "lg" }}>Agent Name:</Text>
              <Text color="white" _hover={{ color: "orange.400", fontSize: "lg" }}>{call.agent_name}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontWeight="bold" color="gray.400" _hover={{ color: "orange.400", fontSize: "lg" }}>Call Quality:</Text>
              <Text color="white" _hover={{ color: "orange.400", fontSize: "lg" }}>{call.call_quality}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontWeight="bold" color="gray.400" _hover={{ color: "orange.400", fontSize: "lg" }}>Call Recording:</Text>
              <Link href={call.call_recording_url} isExternal color="orange.400" _hover={{ color: "blue.400", fontSize: "lg" }}>
                Listen
              </Link>
            </Flex>
          </Box>

          <Divider my={4} borderColor="gray.600" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default CallDetails;
