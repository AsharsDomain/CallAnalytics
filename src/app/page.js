"use client";
import { useState, useEffect } from "react";
import { Box, Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AnalyticsCard from "../components/AnalyticsCard";
import BarChartComponent from "@/components/BarChartComponent";
import LineChartComponent from "@/components/LineChartComponent";
import PieChartComponent from "@/components/PieChartComponent";
import { fetchCalls } from '@/api';
import { ProductTable } from "@/components/ProductTable"; // Import ProductTable

export default function Home() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Dark theme colors
  const cardBg = "rgba(30, 30, 30, 0.9)";
  const borderColor = "gray.700";
  const fontColor = "#FF9A00";

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
    { title: "Total Calls", value: data[0]?.caller || "N/A" },
    { title: "Total Revenue", value: `${data[0]?.callee}` },
    { title: "Average Session", value: `${data[0]?.call_duration || "N/A"} mins` },
    { title: "New Signups", value: data[0]?.call_date || "0" },
    { title: "Active Sessions", value: data.activeSessions || "0" },
    { title: "Total Call Duration", value: `${data[0]?.total_duration || "N/A"} mins` }
  ];

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bg="black">
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
              <GridItem
                height="100%"
                display="flex"
                flexDirection="column"
              >
                <Box
                  border="1px"
                  borderColor={borderColor}
                  p={8}
                  borderRadius="lg"
                  bg={cardBg}
                  shadow="xl"
                  flex="1"
                >
                  <Text fontSize="2xl" fontWeight="bold" mb={6} color={fontColor}>
                    Analytics Overview
                  </Text>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
                    {analyticsData.map((item, index) => (
                      <AnalyticsCard 
                        key={index} 
                        title={item.title} 
                        value={item.value} 
                        bg={cardBg} 
                        color={fontColor} 
                        borderColor={borderColor}
                        _hover={{ transform: "scale(1.07)", transition: "all 0.4s ease-in-out" }}
                      />
                    ))}
                  </Grid>
                </Box>
              </GridItem>

              {/* Right: Graph Container with Stretched Height */}
              <GridItem
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Box 
                  border="1px" 
                  borderColor={borderColor} 
                  p={8} 
                  borderRadius="lg" 
                  bg="gray.900"
                  shadow="xl"
                  height="100%"
                  display="flex"
                  flexDirection="column"
                >
                  <Text fontSize="2xl" fontWeight="bold" mb={6} color={fontColor}>
                    Graph Overview
                  </Text>
                  <Stack spacing={8} flex="1">
                    <LineChartComponent />
                    <PieChartComponent />
                  </Stack>
                </Box>
              </GridItem>
            </Grid>

            {/* Additional Graphs Below */}
            <Box border="1px" borderColor={borderColor} p={8} borderRadius="lg" bg="gray.900" shadow="xl">
              <Text fontSize="2xl" fontWeight="bold" mb={6} color={fontColor}>
                Detailed Graphs
              </Text>
              <Stack spacing={8}>
                <BarChartComponent />
              </Stack>
            </Box>

            {/* Product Table */}
            <Box border="1px" borderColor={borderColor} p={8} borderRadius="lg" bg="gray.900" shadow="xl">
              <Text fontSize="2xl" fontWeight="bold" mb={6} color={fontColor}>
                Product Table
              </Text>
              <ProductTable />
            </Box>

            {/* Additional Container for Multiple Content */}
            <Box border="1px" borderColor={borderColor} p={8} borderRadius="lg" bg="gray.900" shadow="xl">
              <Text fontSize="2xl" fontWeight="bold" mb={6} color={fontColor}>
                Additional Information
              </Text>
              <Stack spacing={8}>
                {/* Add any content you want to display here, like more cards, text, or tables */}
                <Box>
                  <Text color={fontColor} fontWeight="medium">
                    Example Section 1: Display additional data or charts here.
                  </Text>
                </Box>
                <Box>
                  <Text color={fontColor} fontWeight="medium">
                    Example Section 2: Add more relevant information.
                  </Text>
                </Box>
              </Stack>
            </Box>

          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
