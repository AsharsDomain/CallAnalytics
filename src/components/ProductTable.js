import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Select, HStack, Button } from "@chakra-ui/react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import data from "@/tableData.js"; // Assuming this is the path to your mock data

export const ProductTable = () => {
  const [callData, setCallData] = useState(data); // Initialized with your data
  const [filteredData, setFilteredData] = useState(data); // Start with all data
  const [sortBy, setSortBy] = useState('call_date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [timeFilter, setTimeFilter] = useState('');

  const navigate = useNavigate(); // Initialize navigate for navigation

  // Sorting Function
  const sortData = (data, sortBy, sortOrder) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sortedData;
  };

  // Filtering Data
  const filterData = (data, timeFilter) => {
    if (!timeFilter) return data;
    return data.filter(call => {
      const callTime = new Date(call.call_date).getHours();
      if (timeFilter === 'morning') return callTime >= 6 && callTime < 12;
      if (timeFilter === 'afternoon') return callTime >= 12 && callTime < 18;
      if (timeFilter === 'evening') return callTime >= 18 && callTime < 24;
      return true;
    });
  };

  // useEffect to apply sorting and filtering whenever sorting options or filter change
  useEffect(() => {
    const updatedData = sortData(filterData(callData, timeFilter), sortBy, sortOrder);
    setFilteredData(updatedData); // Update the filtered data
  }, [callData, timeFilter, sortBy, sortOrder]); // Re-run effect on these variables' changes

  // Export to CSV
  const handleExportCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "calls.csv");
    link.click();
  };

  // Export to Excel
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Calls");
    XLSX.writeFile(wb, "calls.xlsx");
  };

  // Navigate to call details page
  const handleViewDetails = (id) => {
    navigate(`/call/${id}`); // Use React Router's navigate to go to the details page
  };

  return (
    <Box
      border="1px"
      borderColor="black" // Black border color
      p={8}
      borderRadius="lg"
      bg="rgba(0,0,0,0.9)"
      shadow="xl"
    >
      <HStack spacing={4} mb={4}>
        <Select placeholder="Filter by time" onChange={(e) => setTimeFilter(e.target.value)} color="orange.400">
          <option value="">All</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </Select>
        <Select placeholder="Sort by" onChange={(e) => setSortBy(e.target.value)} color="orange.400">
          <option value="call_date">Date</option>
          <option value="call_duration">Duration</option>
          <option value="call_cost">Cost</option>
          <option value="outcome">Outcome</option>
        </Select>
        <Select placeholder="Sort order" onChange={(e) => setSortOrder(e.target.value)} color="orange.400">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Select>
      </HStack>

      <HStack spacing={4} mb={4}>
        <Button onClick={handleExportCSV} colorScheme="orange">Export CSV</Button>
        <Button onClick={handleExportExcel} colorScheme="orange">Export Excel</Button>
      </HStack>

      <TableContainer>
        <Table variant="striped" colorScheme="blackAlpha" size="md" border="1px" borderColor="black" bg="rgba(0,0,0,0.9)" color="#FF9A00">
          <Thead>
            <Tr>
              <Th color="rgba(255,255,255,0.9)" fontWeight="bold">Call ID</Th>
              <Th color="rgba(255,255,255,0.9)" fontWeight="bold">Date</Th>
              <Th color="rgba(255,255,255,0.9)" fontWeight="bold">Time</Th>
              <Th color="rgba(255,255,255,0.9)" fontWeight="bold">Duration (mins)</Th>
              <Th color="rgba(255,255,255,0.9)" fontWeight="bold">Cost</Th>
              <Th color="rgba(255,255,255,0.9)" fontWeight="bold">Outcome</Th>
              <Th color="rgba(255,255,255,0.9)" fontWeight="bold">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((call, index) => (
              <Tr
                key={index}
                _hover={{ bg: "blackAlpha.700" }}
                transition="0.2s ease-out"
              >
                <Td color="#FF9A00" fontSize="lg" _hover={{ color: "blue.500" }} transition="color 0.2s">{call.call_id}</Td>
                <Td color="#FF9A00" fontSize="lg" _hover={{ color: "blue.500" }} transition="color 0.2s">{new Date(call.call_date).toLocaleDateString()}</Td>
                <Td color="#FF9A00" fontSize="lg" _hover={{ color: "blue.500" }} transition="color 0.2s">{new Date(call.call_date).toLocaleTimeString()}</Td>
                <Td color="#FF9A00" fontSize="lg" _hover={{ color: "blue.500" }} transition="color 0.2s">{call.call_duration || "add"}</Td>
                <Td color="#FF9A00" fontSize="lg" _hover={{ color: "blue.500" }} transition="color 0.2s">{call.call_cost || "N/A"}</Td>
                <Td color="#FF9A00" fontSize="lg" _hover={{ color: "blue.500" }} transition="color 0.2s">{call.outcome || "N/A"}</Td>
                <Td color="#FF9A00" fontSize="lg" _hover={{ color: "blue.500" }} transition="color 0.2s">
                  <Button colorScheme="orange" onClick={() => handleViewDetails(call.call_id)}>View Details</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
