import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { IoIosArrowDropdownCircle } from "react-icons/io"; // Importing an icon for the dropdown
import Header from "./Header"; // Adjust the import path as needed
import Sidebar from "./Sidebar"; // Adjust the import path as needed

const CallExpense = () => {
  const [callCost, setCallCost] = useState("");
  const [agencyMargin, setAgencyMargin] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [callHistory, setCallHistory] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const toast = useToast();

  const handleCalculate = () => {
    const cost = parseFloat(callCost);
    const margin = parseFloat(agencyMargin);

    // Validate input
    if (isNaN(cost) || isNaN(margin) || cost < 0 || margin < 0) {
      toast({
        title: "Invalid input",
        description: "Please enter valid numbers for cost and margin.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const total = cost + cost * (margin / 100);
    setTotalCost(total);

    // Add to call history
    setCallHistory([...callHistory, { cost, margin, total, currency }]);
    // Reset inputs
    setCallCost("");
    setAgencyMargin("");

    toast({
      title: "Expense Added",
      description: `Total cost calculated: ${currency} ${total.toFixed(2)}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleClearHistory = () => {
    setCallHistory([]);
    toast({
      title: "History Cleared",
      description: "Call history has been cleared.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      callHistory
        .map((e) => `${e.cost},${e.margin},${e.total},${e.currency}`)
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "call_expenses.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Box minHeight="100vh" bg="rgba(0,0,0,0.9)">
      {/* Header Section */}
      <Header />

      {/* Main Layout with Sidebar and Content */}
      <Flex>
        {/* Sidebar */}
        <Box
          width="250px"
          bg="black"
          display={{ base: "none", md: "block" }}
          position="sticky"
          top="0"
          h="100vh"
          zIndex="100"
        >
          <Sidebar />
        </Box>

        {/* Main Content Area */}
        <Flex
          flex="1"
          p={8}
          borderRadius="lg"
          bg="rgba(0,0,0,0.9)"
          shadow="xl"
          direction="column"
          gap={8}
        >
          <Text fontSize="2xl" fontWeight="bold" mb={4} color="#FF9A00">
            Call Expense Entry
          </Text>

          {/* Call Expense Entry Form */}
          <Box
            bg="rgba(0,0,0,0.9)"
            p={6}
            borderRadius="lg"
            shadow="xl"
            border="1px"
            borderColor="black"
          >
            <FormControl mb={4}>
              <FormLabel color="#FF9A00">Call Cost</FormLabel>
              <Input
                type="number"
                value={callCost}
                onChange={(e) => setCallCost(e.target.value)}
                placeholder="Enter call cost"
                bg="gray.700"
                color="white"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel color="#FF9A00">Agency Margin (%)</FormLabel>
              <Input
                type="number"
                value={agencyMargin}
                onChange={(e) => setAgencyMargin(e.target.value)}
                placeholder="Enter agency margin"
                bg="gray.700"
                color="white"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel color="#FF9A00">Currency</FormLabel>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<IoIosArrowDropdownCircle />}
                  bg="black"
                  color="orange.400"
                  borderColor="orange.400"
                  
                >
                  {currency}
                </MenuButton>
                <MenuList bg="black" color="orange.400">
                  <MenuItem
                    bg="black"
                    onClick={() => setCurrency("USD")}
                    _hover={{ bg: "gray.700", color: "orange.400" }} // Hover effect
                  >
                    USD
                  </MenuItem>
                  <MenuItem
                    bg="black"
                    onClick={() => setCurrency("EUR")}
                    _hover={{ bg: "gray.700", color: "orange.400" }} // Hover effect
                  >
                    EUR
                  </MenuItem>
                  <MenuItem
                    bg="black"
                    onClick={() => setCurrency("GBP")}
                    _hover={{ bg: "gray.700", color: "orange.400" }} // Hover effect
                  >
                    GBP
                  </MenuItem>
                  <MenuItem
                    bg="black"
                    onClick={() => setCurrency("AUD")}
                    _hover={{ bg: "gray.700", color: "orange.400" }} // Hover effect
                  >
                    AUD
                  </MenuItem>
                  <MenuItem
                    bg="black"
                    onClick={() => setCurrency("CAD")}
                    _hover={{ bg: "gray.700", color: "orange.400" }} // Hover effect
                  >
                    CAD
                  </MenuItem>
                  {/* Add more currencies as needed */}
                </MenuList>
              </Menu>
            </FormControl>
            <Flex justify="space-between" align="center">
              <Button
                colorScheme="green"
                width="200px"
                onClick={handleCalculate}
              >
                Calculate Total Cost
              </Button>
              <Text fontSize="lg" fontWeight="medium" color="#FF9A00">
                Total Cost: {currency} {totalCost.toFixed(2)}
              </Text>
            </Flex>
            <Flex justify="space-between" mt={4}>
              <Button
                colorScheme="blue"
                width="200px"
                onClick={handleExportCSV}
              >
                Export to CSV
              </Button>
              <Button colorScheme="red" onClick={handleClearHistory}>
                Clear History
              </Button>
            </Flex>
          </Box>

          {/* Call History Table */}
          <Box
            bg="rgba(0,0,0,0.9)"
            p={6}
            borderRadius="lg"
            shadow="xl"
            border="1px"
            borderColor="black"
          >
            <Text fontSize="xl" fontWeight="bold" color="#FF9A00" mb={4}>
              Call History
            </Text>
            <Table variant="striped" colorScheme="blackAlpha" size="md">
              <Thead>
                <Tr>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="bold">
                    Cost
                  </Th>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="bold">
                    Margin (%)
                  </Th>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="bold">
                    Total
                  </Th>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="bold">
                    Currency
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {callHistory.map((call, index) => (
                  <Tr key={index}>
                    <Td color="#FF9A00">{call.cost.toFixed(2)}</Td>
                    <Td color="#FF9A00">{call.margin.toFixed(2)}</Td>
                    <Td color="#FF9A00">{call.total.toFixed(2)}</Td>
                    <Td color="#FF9A00">{call.currency}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CallExpense;
