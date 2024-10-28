import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Select,
  HStack,
  Button,
  Spinner,
  Text,
  Global,
} from "@chakra-ui/react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import axios from "axios";
import { Global as EmotionGlobal } from "@emotion/react"; // Renaming the Global import

export const ProductTable = () => {
  const [callData, setCallData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortBy, setSortBy] = useState("startedat");
  const [sortOrder, setSortOrder] = useState("asc");
  const [timeFilter, setTimeFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can set this to any number

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userId = "user_2nHekPnt5JHC1R2sn5Y1GygO4Id";
      try {
        const response = await axios.post("http://localhost:3000/api/call-logs", {
          id: userId,
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = response.data?.callLogs || [];
        console.log("Call Logs Data:", data);
        setCallData(data);
        setFilteredData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortData = (data, sortBy, sortOrder) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sortedData;
  };

  const filterData = (data, timeFilter) => {
    if (!timeFilter) return data;
    return data.filter((call) => {
      const callTime = new Date(call.startedat).getHours();
      if (timeFilter === "morning") return callTime >= 6 && callTime < 12;
      if (timeFilter === "afternoon") return callTime >= 12 && callTime < 18;
      if (timeFilter === "evening") return callTime >= 18 && callTime < 24;
      return true;
    });
  };

  useEffect(() => {
    if (!loading && !error && Array.isArray(callData)) {
      const updatedData = sortData(filterData(callData, timeFilter), sortBy, sortOrder);
      setFilteredData(updatedData);
    }
  }, [callData, timeFilter, sortBy, sortOrder, loading, error]);

  const handleExportCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "calls.csv");
    link.click();
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Calls");
    XLSX.writeFile(wb, "calls.xlsx");
  };

  const handleViewDetails = (call) => {
    navigate(`/call/${call.id}`, { state: { callDetails: call } });
  };

  // Get current data for the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  return (
    <>
      {/* Google Fonts Import */}
      <EmotionGlobal
        styles={`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500&display=swap');
        `}
      />
      <Box border="1px" borderColor="black" p={4} borderRadius="lg" bg="black" shadow="xl">
        <HStack spacing={4} mb={4}>
          <Select placeholder="Filter by time" onChange={(e) => setTimeFilter(e.target.value)} color="#1662D4">
            <option value="">All</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </Select>
          <Select placeholder="Sort by" onChange={(e) => setSortBy(e.target.value)} color="#1662D4">
            <option value="startedat">Date</option>
            <option value="cost">Cost</option>
            <option value="endedreason">Outcome</option>
          </Select>
          <Select placeholder="Sort order" onChange={(e) => setSortOrder(e.target.value)} color="#1662D4">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </HStack>

        <HStack spacing={4} mb={4}>
          <Button onClick={handleExportCSV} colorScheme="blue">Export CSV</Button>
          <Button onClick={handleExportExcel} colorScheme="blue">Export Excel</Button>
        </HStack>

        {/* Make the table horizontally scrollable */}
        <Box overflowX="auto">
          <TableContainer>
            <Table
              variant="striped"
              colorScheme="blackAlpha"
              size={{ base: "sm", md: "md" }} // Adjust size for responsiveness
              border="1px"
              borderColor="black"
              bg="black"
              color="white"
            >
              <Thead>
                <Tr>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="500" fontFamily="Inter">Call ID</Th>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="500" fontFamily="Inter">Date</Th>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="500" fontFamily="Inter">Time</Th>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="500" fontFamily="Inter">Duration (mins)</Th>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="500" fontFamily="Inter">Cost</Th>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="500" fontFamily="Inter">Outcome</Th>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="500" fontFamily="Inter">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Array.isArray(currentData) && currentData.length > 0 ? (
                  currentData.map((call, index) => (
                    <Tr key={index} _hover={{ bg: "blackAlpha.700" }} transition="0.2s ease-out">
                      <Td color="white" fontWeight="400" fontFamily="Inter" _hover={{ color: "blue.500" }} transition="color 0.2s">{call.id}</Td>
                      <Td color="white" fontWeight="400" fontFamily="Inter" _hover={{ color: "blue.500" }} transition="color 0.2s">{new Date(call.startedat).toLocaleDateString()}</Td>
                      <Td color="white" fontWeight="400" fontFamily="Inter" _hover={{ color: "blue.500" }} transition="color 0.2s">{new Date(call.startedat).toLocaleTimeString()}</Td>
                      <Td color="white" fontWeight="400" fontFamily="Inter" _hover={{ color: "blue.500" }} transition="color 0.2s">{call.duration_in_minutes}</Td>
                      <Td color="white" fontWeight="400" fontFamily="Inter" _hover={{ color: "blue.500" }} transition="color 0.2s">{call.cost} Rs</Td>
                      <Td color="white" fontWeight="400" fontFamily="Inter" _hover={{ color: "blue.500" }} transition="color 0.2s">{call.endedreason}</Td>
                      <Td>
                        <Button size="sm" onClick={() => handleViewDetails(call)} colorScheme="blue">Details</Button>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={7} textAlign="center">No call logs found</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        {/* Pagination Controls */}
        <HStack justifyContent="space-between" mt={4}>
          <Button
            onClick={prevPage}
            isDisabled={currentPage === 1}
            colorScheme="blue"
          >
            Previous
          </Button>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            onClick={nextPage}
            isDisabled={currentPage === totalPages}
            colorScheme="blue"
          >
            Next
          </Button>
        </HStack>
      </Box>
    </>
  );
};
