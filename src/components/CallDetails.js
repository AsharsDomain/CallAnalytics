import { useParams } from 'react-router-dom';
import { 
  Box, 
  Text, 
  Flex, 
  Link, 
  Heading, 
  Divider, 
  VStack, 
  useBreakpointValue 
} from "@chakra-ui/react";
import data from "@/tableData.js"; // Import your mock data
import Header from "@/components/Header"; // Adjust the path as necessary
import Sidebar from "@/components/Sidebar"; // Adjust the path as necessary

const CallDetails = () => {
  const { id } = useParams(); // Get the call ID from the route parameters
  const call = data.find(call => call.call_id === parseInt(id)); // Find the specific call data

  if (!call) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Text fontSize="xl" color="red.400">Call not found or loading...</Text>
      </Flex>
    );
  }

  // Determine layout based on screen size
  const isColumn = useBreakpointValue({ base: true, md: false });

  // Define a custom blue shadow
  const blueShadow = "0 4px 6px rgba(66, 153, 225, 0.6)"; // blue.400 with 60% opacity

  return (
    <Box>
      <Header /> {/* Render Header */}
      <Flex>
        <Sidebar /> {/* Render Sidebar */}
        <Box flex="1" p={6} bg="black" minH="100vh">
          <Heading 
            as="h1" 
            size="lg" 
            color="white" 
            mb={4} 
            textAlign="center"
            _hover={{ color: "orange.400", transform: "scale(1.05)", transition: "0.2s ease-in-out" }}
          >
            Call Details for ID: {call.call_id}
          </Heading>

          <Divider my={4} borderColor="black" />

          {/* Two-Column Layout */}
          <Flex
            direction={isColumn ? "column" : "row"} // Stack vertically on small screens
            gap={6}
            justify="space-between"
          >
            {/* Call Details Container */}
            <Box 
              flex="1" 
              bg="black" 
              p={4} 
              borderRadius="md" 
              boxShadow={blueShadow} // Apply custom blue shadow
              _hover={{ transform: "scale(1.02)", transition: "transform 0.2s ease-in-out" }}
            >
              <VStack align="start" spacing={3}>
                {/* Caller Information */}
                <Box w="100%" p={2} borderRadius="md" _hover={{ bg: "gray.700" }} transition="background 0.2s ease-in-out">
                  <Flex justify="space-between">
                    <Text fontWeight="bold" color="gray.400">Caller Name:</Text>
                    <Text color="white">{call.caller_name}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontWeight="bold" color="gray.400">Caller Number:</Text>
                    <Text color="white">{call.caller_number}</Text>
                  </Flex>
                </Box>

                {/* Call Information */}
                <Box w="100%" p={2} borderRadius="md" _hover={{ bg: "gray.700" }} transition="background 0.2s ease-in-out">
                  <Flex justify="space-between">
                    <Text fontWeight="bold" color="gray.400">Call Date:</Text>
                    <Text color="white">{new Date(call.call_date).toLocaleDateString()}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontWeight="bold" color="gray.400">Call Time:</Text>
                    <Text color="white">{new Date(call.call_date).toLocaleTimeString()}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontWeight="bold" color="gray.400">Call Duration:</Text>
                    <Text color="white">{call.call_duration} minutes</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontWeight="bold" color="gray.400">Call Cost:</Text>
                    <Text color="white">${call.call_cost}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontWeight="bold" color="gray.400">Outcome:</Text>
                    <Text color="white">{call.outcome}</Text>
                  </Flex>
                </Box>

                {/* Additional Information */}
                <Box w="100%" p={2} borderRadius="md" _hover={{ bg: "gray.700" }} transition="background 0.2s ease-in-out">
                  <Flex justify="space-between">
                    <Text fontWeight="bold" color="gray.400">Call Type:</Text>
                    <Text color="white">{call.call_type}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontWeight="bold" color="gray.400">Location:</Text>
                    <Text color="white">{call.location}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontWeight="bold" color="gray.400">Agent Name:</Text>
                    <Text color="white">{call.agent_name}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontWeight="bold" color="gray.400">Call Quality:</Text>
                    <Text color="white">{call.call_quality}</Text>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="bold" color="gray.400">Call Recording:</Text>
                    <Link 
                      href={call.call_recording_url} 
                      isExternal 
                      color="orange.400" 
                      _hover={{ color: "blue.400", textDecoration: "underline" }}
                    >
                      Listen
                    </Link>
                  </Flex>
                </Box>
              </VStack>
            </Box>

            {/* Transcript Container */}
            <Box 
              flex="1" 
              bg="black" 
              p={4} 
              borderRadius="md" 
              boxShadow={blueShadow} // Apply custom blue shadow
              _hover={{ transform: "scale(1.02)", transition: "transform 0.2s ease-in-out" }}
            >
              <Heading 
                as="h2" 
                size="md" 
                color="blue.400" 
                mb={4} 
                textAlign="center"
                _hover={{ color: "orange.400", transform: "scale(1.05)", transition: "0.2s ease-in-out" }}
              >
                Transcript
              </Heading>

              <Divider my={2} borderColor="gray.600" />

              <Box 
                bg="black" 
                p={3} 
                borderRadius="md" 
                maxH="400px" 
                overflowY="auto"
              >
                <Text color="white" whiteSpace="pre-wrap">
                  {call.transcript || "No transcript available for this call."}
                </Text>
              </Box>
            </Box>
          </Flex>

          <Divider my={4} borderColor="gray.600" />
        </Box>
      </Flex>
    </Box>
  );
};

export default CallDetails;
