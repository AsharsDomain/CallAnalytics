import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Adjust the import based on your routing library

const Header = () => {
  const fontColor = "#9B59B6"; // Purple color
  const bgColor = "black";
  const borderColor = fontColor; // Purple color for the border

  return (
    <Box
      as="header"
      bg={bgColor}
      color={fontColor}
      p={4}
      borderBottom={`2px solid ${borderColor}`} // Purple border at the bottom
      position="relative"
    >
      <Flex align="center" justify="space-between">
        {/* Analytics Dashboard Heading */}
        <Text fontSize="2xl" fontWeight="bold" color={fontColor} ml={4}>
          Analytics Dashboard
        </Text>

        {/* Navbar Sections */}
        <Flex gap={6} align="center">
          <Link to="/home">
            <Text fontSize="lg" fontWeight="medium" color={fontColor} _hover={{ textDecoration: "underline" }}>
              Home
            </Text>
          </Link>
          <Link to="/analytics">
            <Text fontSize="lg" fontWeight="medium" color={fontColor} _hover={{ textDecoration: "underline" }}>
              Analytics
            </Text>
          </Link>
          <Link to="/reports">
            <Text fontSize="lg" fontWeight="medium" color={fontColor} _hover={{ textDecoration: "underline" }}>
              Reports
            </Text>
          </Link>
          <Link to="/settings">
            <Text fontSize="lg" fontWeight="medium" color={fontColor} _hover={{ textDecoration: "underline" }}>
              Settings
            </Text>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
