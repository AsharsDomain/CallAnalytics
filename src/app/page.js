// src/app/page.js
"use client"
import { useState, useEffect } from 'react';
import { Box, Flex, SimpleGrid, Stack, useColorModeValue, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AnalyticsCard from "../components/AnalyticsCard";
import BarChartComponent from "@/components/BarChartComponent";
import LineChartComponent from "@/components/LineChartComponent";
import PieChartComponent from "@/components/PieChartComponent";
import { fetchCalls } from '@/api';

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const cardBg = useColorModeValue("white", "gray.700");

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

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  // Assuming 'data' is an array of call records and using mock data for demonstration
  const mockData = [
    { title: "Total Calls", value: `${data.length}` },
    { title: "Total Revenue", value: "$30,000" }, // Modify based on actual data
    { title: "Average Session", value: "15 mins" }, // Modify based on actual data
    { title: "New Signups", value: "200" }, // Modify based on actual data
    { title: "Active Sessions", value: "45" }, // Modify based on actual data
  ];

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bg={useColorModeValue("gray.50", "gray.800")}>
      <Header />
      <Flex flex="1">
        <Sidebar />
        <Box as="main" flex="1" p={6} display="flex" flexDirection="column" gap={6}>
          <Stack spacing={6} flex="1">
            {/* Analytics Cards Container */}
            <Box border="1px" borderColor="gray.200" p={6} borderRadius="lg" bg={useColorModeValue("white", "gray.700")} shadow="lg">
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                Analytics Overview
              </h2>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mt={4}>
                {mockData.map((item, index) => (
                  <AnalyticsCard 
                    key={index} 
                    title={item.title} 
                    value={item.value} 
                    bg={cardBg} 
                    shadow="lg" 
                    borderRadius="lg" 
                    _hover={{ transform: "scale(1.07)", transition: "all 0.4s ease-in-out" }}
                  />
                ))}
              </SimpleGrid>
            </Box>

            {/* Graphs Container */}
            <Box border="1px" borderColor="gray.200" p={6} borderRadius="lg" bg={useColorModeValue("white", "gray.700")} shadow="lg">
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                Graphs Overview
              </h2>
              <Stack spacing={8}>
                <LineChartComponent />
                <BarChartComponent />
                <PieChartComponent />
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
