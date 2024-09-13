import { Box, Flex, SimpleGrid, Stack } from "@chakra-ui/react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AnalyticsCard from "../components/AnalyticsCard";
import BarChartComponent from "@/components/BarChartComponent";
import LineChartComponent from "@/components/LineChartComponent";
import PieChartComponent from "@/components/PieChartComponent";

const mockData = [
  { title: "Total Users", value: "1500" },
  { title: "Total Revenue", value: "$30,000" },
  { title: "Average Session", value: "15 mins" },
  { title: "New Signups", value: "200" },
  { title: "Active Sessions", value: "45" },
];

export default function Home() {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />
      <Flex flex="1">
        <Sidebar />
        <Box as="main" flex="1" p={4} display="flex" flexDirection="column" gap={4}>
          <Stack spacing={4} flex="1">
            {/* Central container for analytics cards */}
            <Box border="1px" borderColor="gray.200" p={4} borderRadius="md" flex="1">
              <h2>Analytics cards</h2>
              <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={4}>
                {mockData.map((item, index) => (
                  <AnalyticsCard key={index} title={item.title} value={item.value} />
                ))}
              </SimpleGrid>
            </Box>

            {/* Central container for graphs and other content */}
            <Box border="1px" borderColor="gray.200" p={4} borderRadius="md" flex="1">
              <h2>Graphs and other main content</h2>
              <Stack spacing={4}>
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
