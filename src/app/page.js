// Home.js
"use client";
import { useState, useEffect } from "react";
import { Box, Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import AnalyticsCard from "@/components/AnalyticsCard";
import BarChartComponent from "@/components/BarChartComponent";
import LineChartComponent from "@/components/LineChartComponent";
import PieChartComponent from "@/components/PieChartComponent";
import { fetchCalls } from "@/api";
import CostBreakdown from "@/components/CostBreakdown"; // Import CostBreakdown component
import ShufflingCards from "@/components/ShufflingCards"; // Import ShufflingCards component

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem('primaryColor') || '#00BFFF'; // Default color
  });

  // Dark theme colors
  const cardBg = "black"; // Set card background to black
  const borderColor = "gray.700";
  const fontColor = "white";
  const headingColor = "#1662D4";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCalls();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <Text color={fontColor}>Loading...</Text>;
  if (error) return <Text color={fontColor}>Error: {error.message}</Text>;

  // Assuming 'data' has the relevant fields from the API
  const analyticsData = [
    { title: "Total Minutes Used", value: data[0]?.caller || "N/A" },
    { title: "Total Call Cost", value: data[0]?.callee || "N/A" },
    { title: "Average Call Duration", value: `${data[0]?.call_duration || "N/A"} mins` },
    { title: "Call Volume Trends", value: data[0]?.call_date || "0" },
    { title: "Peak Hour Analysis", value: data[0]?.activeSessions || "0" },
    { title: "Call Outcome Stats", value: `${data[0]?.total_duration || "N/A"} mins` }
  ];

  // Sample call data and agent data for the CostBreakdown component
  const callData = [
    { id: "call1", cost: 12.34, duration: 15 },
    { id: "call2", cost: 7.89, duration: 8 },
    // Add more call data here...
  ];

  const agentData = [
    { id: "agent1", totalCost: 20.23, totalDuration: 45, callCount: 3 },
    { id: "agent2", totalCost: 30.56, totalDuration: 60, callCount: 5 },
    // Add more agent data here...
  ];

  // Inspirational quotes for shuffling
  const quotes = [
    "Success is not final; failure is not fatal: It is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "The only way to do great work is to love what you do.",
    "Strive not to be a success, but rather to be of value.",
    "I attribute my success to this: I never gave or took any excuse.",
    "The harder the conflict, the more glorious the triumph.",
  ];

  // Create card content with quotes
  const cardsContent = quotes.map((quote, idx) => (
    <Box 
      bg="black" // Changed from gray.700 to black
      p={6} 
      borderRadius="md" 
      color="white" 
      key={idx}
      textAlign="center"
      fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
      fontStyle="italic"
      display="flex"
      alignItems="center"
      justifyContent="center"
      // Optional: Add border or shadow if desired
    >
      "{quote}"
    </Box>
  ));

  return (
    <Box maxWidth="100vw" minHeight="100vh" display="flex" flexDirection="column" bg="black">
      <Header />
      <Flex flex="1">
        {/* Sticky Sidebar */}
        <Box position="sticky" top="0" h="100vh" zIndex="100">
          <Sidebar />
        </Box>

        <Box as="main" flex="1" p={8} display="flex" flexDirection="column" gap={8}>
          <Stack spacing={8} flex="1">
            {/* Main Grid Layout */}
            <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
              
              {/* Left: Analytics Cards Container */}
              <GridItem height="100%" display="flex" flexDirection="column" flexGrow={4}>
                <Box
                  border="1px"
                  borderColor={borderColor}
                  p={8}
                  borderRadius="lg"
                  bg="black" // Set the background to black
                  flex="1"
                  height="100%" // Ensure the container grows to fill the height
                >
                  <Text fontSize="2xl" fontWeight="bold" mb={6} color={headingColor}>
                    Analytics Overview
                  </Text>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
                    {analyticsData.map((item, index) => (
                      <AnalyticsCard 
                        key={index} 
                        title={item.title} 
                        value={item.value} 
                        bg={cardBg} // Set the background to black
                        color={fontColor} 
                        borderColor={borderColor}
                        _hover={{ transform: "scale(1.07)", transition: "all 0.4s ease-in-out" }}
                      />
                    ))}
                  </Grid>
                </Box>
              </GridItem>

              {/* Right: Graph Container with Stretched Height */}
              <GridItem height="100%" display="flex" flexDirection="column" flexGrow={4}>
                <Box 
                  border="1px" 
                  borderColor={borderColor} 
                  p={8} 
                  borderRadius="lg" 
                  bg="black" // Set background to black
                  flex="1"
                  height="100%" // Ensure this container grows to match the height of the left container
                  display="flex"
                  flexDirection="column"
                >
                  <Text fontSize="2xl" fontWeight="bold" mb={6} color={headingColor}>
                    Graph Overview
                  </Text>
                  <Stack spacing={8} flex="1">
                    <LineChartComponent />
                    <PieChartComponent callData={data} />
                  </Stack>
                </Box>
              </GridItem>
            </Grid>

            {/* Additional Graphs Below */}
            <Box border="1px" borderColor={borderColor} p={8} borderRadius="lg" bg="black">
              <Text fontSize="2xl" fontWeight="bold" mb={6} color={headingColor}>
                Detailed Graphs
              </Text>
              <Stack spacing={8}>
                <BarChartComponent />
              </Stack>
            </Box>

            {/* Product Table with Cost Breakdown */}
            <Box border="1px" borderColor={borderColor} p={8} borderRadius="lg" bg="black">
              <Text fontSize="2xl" fontWeight="bold" mb={6} color={headingColor}>
                Call View Stats
              </Text>
              {/* Render CostBreakdown Component */}
              <CostBreakdown callData={callData} agentData={agentData} />
            </Box>

            {/* Additional Container for Shuffling Cards */}
            <Box border="1px" borderColor={borderColor} p={8} borderRadius="lg" bg="black">
              <Text fontSize="2xl" fontWeight="bold" mb={6} color={fontColor}>
               
              </Text>
              <ShufflingCards cards={cardsContent} interval={7000} /> {/* Use the ShufflingCards component with 7s interval */}
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
