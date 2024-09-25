"use client";
import { useState } from "react";
import {
  Box,
  Flex,
  Stack,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Switch,
  IconButton,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([
    { name: "Call Cost Alert", threshold: 100, active: true },
    { name: "Duration Alert", threshold: 60, active: false },
  ]);
  const [newAlert, setNewAlert] = useState({ name: "", threshold: "", active: false });
  const [editingIndex, setEditingIndex] = useState(null);

  // Dark theme colors
  const cardBg = "rgba(30, 30, 30, 0.9)";
  const borderColor = "gray.700";
  const fontColor = "#FF9A00";

  const handleAddAlert = () => {
    if (editingIndex !== null) {
      const updatedAlerts = [...alerts];
      updatedAlerts[editingIndex] = newAlert;
      setAlerts(updatedAlerts);
      setEditingIndex(null);
    } else {
      setAlerts([...alerts, newAlert]);
    }
    setNewAlert({ name: "", threshold: "", active: false });
  };

  const handleEditAlert = (index) => {
    setNewAlert(alerts[index]);
    setEditingIndex(index);
  };

  const handleDeleteAlert = (index) => {
    const updatedAlerts = alerts.filter((_, i) => i !== index);
    setAlerts(updatedAlerts);
  };

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
            {/* Alert Configuration Section */}
            <Box border="1px" borderColor={borderColor} p={8} borderRadius="lg" bg={cardBg} shadow="xl">
              <Text fontSize="2xl" fontWeight="bold" mb={6} color={fontColor}>
                Custom Alert Configuration
              </Text>

              {/* Form to add/edit alerts */}
              <Stack spacing={4} mb={6}>
                <Input
                  placeholder="Alert Name"
                  value={newAlert.name}
                  onChange={(e) => setNewAlert({ ...newAlert, name: e.target.value })}
                  color={fontColor}
                />
                <Input
                  placeholder="Threshold"
                  value={newAlert.threshold}
                  onChange={(e) => setNewAlert({ ...newAlert, threshold: e.target.value })}
                  color={fontColor}
                />
                <Flex alignItems="center" color={fontColor}>
                  <Text mr={4}>Active:</Text>
                  <Switch
                    isChecked={newAlert.active}
                    onChange={(e) => setNewAlert({ ...newAlert, active: e.target.checked })}
                  />
                </Flex>
                <Button colorScheme="teal" onClick={handleAddAlert}>
                  {editingIndex !== null ? "Update Alert" : "Add Alert"}
                </Button>
              </Stack>

              {/* Display the alerts in a table */}
              <Table variant="simple" size="md" color={fontColor}>
                <Thead>
                  <Tr>
                    <Th color={fontColor}>Name</Th>
                    <Th color={fontColor}>Threshold</Th>
                    <Th color={fontColor}>Active</Th>
                    <Th color={fontColor}>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {alerts.map((alert, index) => (
                    <Tr key={index}>
                      <Td>{alert.name}</Td>
                      <Td>{alert.threshold}</Td>
                      <Td>{alert.active ? "Yes" : "No"}</Td>
                      <Td>
                        <IconButton
                          icon={<CiEdit />}
                          onClick={() => handleEditAlert(index)}
                          mr={2}
                        />
                        <IconButton
                          icon={<MdDelete />}
                          onClick={() => handleDeleteAlert(index)}
                          colorScheme="red"
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
