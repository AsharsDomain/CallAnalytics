"use client";
import { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Select, HStack, Button } from "@chakra-ui/react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import data from "@/tableData.js";


export const ProductTable = () => {
  const [callData, setCallData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('call_date');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [timeFilter, setTimeFilter] = useState(''); 
  console.log(data[0].call_cost,"ash");// Example: 'morning', 'afternoon', etc.

  // Fetch mock data from the mockData.json file
  // const fetchMockData = async () => {
  //   const response = await fetch('/tableData.js');
  //   const data = await response.json();
  //   return data;
  // };

  // useEffect(() => {
  //   const getCallData = async () => {
  //     try {
  //       const data = await fetchMockData(); // Fetching mock data
  //       setCallData(data);
  //       setFilteredData(data); // Initialize filtered data
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   getCallData();
  // }, []);

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

  // Apply filtering and sorting
  const filteredSortedData = sortData(filterData(filteredData, timeFilter), sortBy, sortOrder);

  const handleExportCSV = () => {
    const csv = Papa.unparse(filteredSortedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "calls.csv");
    link.click();
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredSortedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Calls");
    XLSX.writeFile(wb, "calls.xlsx");
  };

  
  if (error) return <Text color="red.400">Error: {error.message}</Text>;

  return (
    <Box>
      <Box mb={4}>
        <Select placeholder="Filter by time" onChange={(e) => setTimeFilter(e.target.value)} color="orange.400">
          <option value="">All</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </Select>
      </Box>

      <Box mb={4}>
        <HStack spacing={4}>
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
      </Box>

      <HStack spacing={4} mb={4}>
        <Button onClick={handleExportCSV} colorScheme="orange">Export CSV</Button>
        <Button onClick={handleExportExcel} colorScheme="orange">Export Excel</Button>
      </HStack>

      <TableContainer>
        <Table variant="simple" colorScheme="gray">
          <Thead>
            <Tr>
              <Th border="1px" borderColor="gray.700" color="orange.400">Date</Th>
              <Th border="1px" borderColor="gray.700" color="orange.400">Time</Th>
              <Th border="1px" borderColor="gray.700" color="orange.400">Duration (mins)</Th>
              <Th border="1px" borderColor="gray.700" color="orange.400">Cost</Th>
              <Th border="1px" borderColor="gray.700" color="orange.400">Outcome</Th>
            </Tr>
          </Thead>
          <Tbody>
          console.log(data,"kk");
            {data.map((call, index) => (
              
              <Tr key={index}>
                <Td border="1px" borderColor="gray.700" color="white">{new Date(call.call_date).toLocaleDateString()}</Td>
                <Td border="1px" borderColor="gray.700" color="white">{new Date(call.call_date).toLocaleTimeString()}</Td>
                <Td border="1px" borderColor="gray.700" color="white">{call.call_duration || "add"}</Td>
                <Td border="1px" borderColor="gray.700" color="white">{call.call_cost || "N/A"}</Td>
                <Td border="1px" borderColor="gray.700" color="white">{call.outcome || "N/A"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
