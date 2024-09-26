// src/components/CallExpense.js
import { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const CallExpense = () => {
  const [callCost, setCallCost] = useState("");
  const [agencyMargin, setAgencyMargin] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const handleCalculate = () => {
    const cost = parseFloat(callCost);
    const margin = parseFloat(agencyMargin);
    if (!isNaN(cost) && !isNaN(margin)) {
      setTotalCost(cost + (cost * (margin / 100)));
    }
  };

  return (
    <Box>
      {/* Header Section */}
      <Header />

      {/* Main Layout with Sidebar and Content */}
      <Flex>
        {/* Sidebar */}
        <Box width="250px" bg="black">
          <Sidebar />
        </Box>

        {/* Main Content Area */}
        <Box flex="1" p={8} borderRadius="lg" bg="gray.900" shadow="xl">
          <Text fontSize="2xl" fontWeight="bold" mb={4} color="#FF9A00">
            Call Expense Entry
          </Text>
          <FormControl mb={4}>
            <FormLabel color="#FF9A00">Call Cost ($)</FormLabel>
            <Input
              type="number"
              value={callCost}
              onChange={(e) => setCallCost(e.target.value)}
              placeholder="Enter call cost"
              bg="white"
              color="black"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel color="#FF9A00">Agency Margin (%)</FormLabel>
            <Input
              type="number"
              value={agencyMargin}
              onChange={(e) => setAgencyMargin(e.target.value)}
              placeholder="Enter agency margin"
              bg="white"
              color="black"
            />
          </FormControl>
          <Flex justify="space-between" align="center">
            <Button colorScheme="purple" onClick={handleCalculate}>
              Calculate Total Cost
            </Button>
            <Text fontSize="lg" fontWeight="medium" color="#FF9A00">
              Total Cost: ${totalCost.toFixed(2)}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default CallExpense;
