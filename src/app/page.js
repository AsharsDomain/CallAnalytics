// src/app/page.js
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Box, Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box>
      <Header />
      <Flex>
        <Sidebar />
        <Box as="main" flex="1" p={4}>
          {/* Central container for charts and graphs */}
          <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
            {/* Place your charts and graphs here */}
            <h2>Analytics cards</h2>
          </Box>
          <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
            {/* Place your charts and graphs here */}
            <h2>Graphs and other main content</h2>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
