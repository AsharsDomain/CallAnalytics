"use client";
import { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Header from "@/components/Header"; // Adjust the import path as needed
import Sidebar from "@/components/Sidebar"; // Adjust the import path as needed

const AdminPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userList, setUserList] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User" },
  ]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" }); // State for new user
  const [isAddUserOpen, setIsAddUserOpen] = useState(false); // State for adding user modal
  const toast = useToast();

  // Function to open the modal and set the current user
  const handleEdit = (user) => {
    setCurrentUser(user);
    setSelectedRole(user.role); // Set initial role in the modal
    onOpen(); // Open the modal
  };

  // Function to simulate an API call for updating the role
  const updateUserRole = (userId, newRole) => {
    setTimeout(() => {
      setUserList((prevUserList) =>
        prevUserList.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      toast({
        title: `Role Updated`,
        description: `${currentUser.name}'s role has been updated to ${newRole}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }, 1000); // Simulate a delay
  };

  // Function to save the role
  const handleSaveRole = () => {
    updateUserRole(currentUser.id, selectedRole);
  };

  // Function to open the add user modal
  const handleAddUserOpen = () => {
    setNewUser({ name: "", email: "", role: "User" }); // Reset new user data
    setIsAddUserOpen(true);
  };

  // Function to add a new user
  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const newUserData = {
        id: userList.length + 1, // Assign a new ID
        ...newUser,
      };

      // Simulate an API call
      setTimeout(() => {
        setUserList((prevUserList) => [...prevUserList, newUserData]);
        toast({
          title: `User Added`,
          description: `${newUser.name} has been added successfully.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setIsAddUserOpen(false); // Close the modal
      }, 1000); // Simulate a delay
    } else {
      toast({
        title: `Error`,
        description: `Please fill in all fields.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bg="rgba(0,0,0,0.9)">
      <Header /> {/* Header on top */}
      <Flex flex="1">
        {/* Sticky Sidebar */}
        <Box position="sticky" top="0" h="100vh" zIndex="100">
          <Sidebar />
        </Box>

        {/* Main content area */}
        <Box as="main" flex="1" p={8} display="flex" flexDirection="column" gap={8}>
          <Box p={4}>
            <Text fontSize="2xl" fontWeight="bold" mb={6} color="#FF9A00">
              Welcome to the Admin Page
            </Text>
            <Text mt={2} color="white">
              This page is accessible to admin users only.
            </Text>
          </Box>

          {/* User Management Section */}
          <Box bg="rgba(0,0,0,0.9)" p={6} borderRadius="lg" shadow="xl" border="1px" borderColor="black">
            <Text fontSize="xl" fontWeight="bold" color="#FF9A00">
              User Management
            </Text>
            <Button colorScheme="green" onClick={handleAddUserOpen} mb={4}>
              Add New User
            </Button>
            <Table mt={4} variant="striped" colorScheme="blackAlpha" border="1px" borderColor="black" size="md">
              <Thead>
                <Tr>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="bold">Username</Th>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="bold">Email</Th>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="bold">Role</Th>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="bold">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userList.map((user) => (
                  <Tr
                    key={user.id}
                    _hover={{ bg: "blackAlpha.700" }} // Black hover state for row
                    transition="0.2s ease-out"
                  >
                    <Td
                      fontSize="lg"
                      color="#FF9A00"
                      _hover={{ color: "blue.500" }} // Blue color when hovered
                      transition="color 0.2s"
                    >
                      {user.name}
                    </Td>
                    <Td
                      fontSize="lg"
                      color="#FF9A00"
                      _hover={{ color: "blue.500" }} // Blue color when hovered
                      transition="color 0.2s"
                    >
                      {user.email}
                    </Td>
                    <Td
                      fontSize="lg"
                      color="#FF9A00"
                      _hover={{ color: "blue.500" }} // Blue color when hovered
                      transition="color 0.2s"
                    >
                      {user.role}
                    </Td>
                    <Td>
                      <Button size="sm" colorScheme="yellow" onClick={() => handleEdit(user)}>
                        Edit
                      </Button>
                      <Button size="sm" colorScheme="red" ml={2}>
                        Remove
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          {/* Modal for Editing User Role */}
          {currentUser && (
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent bg="rgba(0,0,0,0.9)" color="#FF9A00">
                <ModalHeader fontWeight="bold">Edit Role for {currentUser.name}</ModalHeader>
                <ModalBody>
                  <Select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    color="black"
                    bg="white"
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Moderator">Moderator</option>
                  </Select>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleSaveRole}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}

          {/* Modal for Adding New User */}
          <Modal isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)}>
            <ModalOverlay />
            <ModalContent bg="rgba(0,0,0,0.9)" color="#FF9A00">
              <ModalHeader fontWeight="bold">Add New User</ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Username"
                  mb={3}
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  color="white"
                  bg="gray.700"
                />
                <Input
                  placeholder="Email"
                  mb={3}
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  color="white"
                  bg="gray.700"
                />
                <Select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  color="black"
                  bg="white"
                  mb={3}
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                </Select>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddUser}>
                  Add User
                </Button>
                <Button onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
    </Box>
  );
};

export default AdminPage;
