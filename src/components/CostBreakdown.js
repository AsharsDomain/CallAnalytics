import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";

const CostBreakdownPerCall = ({ callData }) => {
  return (
    <Box overflowX="auto">
      <Table >
        <Thead>
          <Tr>
            <Th color="white">Call ID</Th>
            <Th color="white">Cost ($)</Th>
            <Th color="white">Duration (mins)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {callData.map((call) => (
            <Tr key={call.id}>
              <Td color="white">{call.id}</Td>
              <Td color="white">${call.cost ? call.cost.toFixed(2) : "N/A"}</Td>
              <Td color="white">{call.duration} mins</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

const CostBreakdownPerAgent = ({ agentData }) => {
  return (
    <Box overflowX="auto">
      <Table >
        <Thead>
          <Tr>
            <Th color="white">Agent ID</Th>
            <Th color="white">Total Cost ($)</Th>
            <Th color="white">Total Call Duration (mins)</Th>
            <Th color="white">Number of Calls</Th>
          </Tr>
        </Thead>
        <Tbody>
          {agentData.map((agent) => (
            <Tr key={agent.id}>
              <Td color="white">{agent.id}</Td>
              <Td color="white">${agent.totalCost ? agent.totalCost.toFixed(2) : "N/A"}</Td>
              <Td color="white">{agent.totalDuration} mins</Td>
              <Td color="white">{agent.callCount}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

const CostBreakdown = ({ callData, agentData }) => {
  return (
    <Box
      border="1px"
      borderColor="gray.700"
      p={8}
      borderRadius="lg"
      bg="gray.800"
      shadow="xl"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={6} color="#FF9A00">
        Cost Breakdown
      </Text>
      <Tabs isFitted variant="enclosed" colorScheme="orange">
        <TabList mb="1em">
          <Tab
            _selected={{ bg: "gray.700", color: "white" }}
            color="gray.400"
            _hover={{ color: "white" }}
          >
            Per Call
          </Tab>
          <Tab
            _selected={{ bg: "gray.700", color: "white" }}
            color="gray.400"
            _hover={{ color: "white" }}
          >
            Per Agent
          </Tab>
        </TabList>
        <TabPanels>
          {/* Per Call View */}
          <TabPanel>
            <CostBreakdownPerCall callData={callData} />
          </TabPanel>
          {/* Per Agent View */}
          <TabPanel>
            <CostBreakdownPerAgent agentData={agentData} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default CostBreakdown;
