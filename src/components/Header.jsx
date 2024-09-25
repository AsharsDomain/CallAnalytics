import { Box, Flex, Text, IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoNotificationsCircle } from "react-icons/io5";

const Header = () => {
  const fontColor = "#9B59B6"; // Orange color
  const bgColor = "black";
  const borderColor = fontColor; // Orange color for the border

  return (
    <Box
      as="header"
      bg={bgColor}
      color={fontColor}
      p={4}
      borderBottom={`2px solid ${borderColor}`} // Corrected syntax for border
      position="relative"
      width="100%"
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
          <Link to="/">
            <Text fontSize="lg" fontWeight="medium" color={fontColor} _hover={{ textDecoration: "underline" }}>
              Analytics
            </Text>
          </Link>
          <Link to="/analytics">
            <Text fontSize="lg" fontWeight="medium" color={fontColor} _hover={{ textDecoration: "underline" }}>
              Reports
            </Text>
          </Link>
          <Link to="/alerts">
            <Text fontSize="lg" fontWeight="medium" color={fontColor} _hover={{ textDecoration: "underline" }}>
              Alerts
            </Text>
          </Link>

          {/* Notification Bell Icon with Dropdown */}
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<IoNotificationsCircle />}
              fontSize="2.5rem"
              color={fontColor}
              variant="ghost"
              aria-label="Notifications"
              _hover={{ bg: "gray.700", color: "#FFFFFF" }} // Change color on hover
            />
            <MenuList bg={bgColor} color={fontColor} borderColor={borderColor}>
              {/* Example Notifications */}
              <MenuItem _hover={{ bg: "gray.700", color: fontColor }} onClick={() => alert("Notification 1 clicked!")}>
                Notification 1
              </MenuItem>
              <MenuItem _hover={{ bg: "gray.700", color: fontColor }} onClick={() => alert("Notification 2 clicked!")}>
                Notification 2
              </MenuItem>
              <MenuItem _hover={{ bg: "gray.700", color: fontColor }} onClick={() => alert("Notification 3 clicked!")}>
                Notification 3
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
