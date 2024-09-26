import { Box, Flex, Text, IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoNotificationsCircle } from "react-icons/io5";
import { CiLinkedin } from "react-icons/ci"; // Import LinkedIn icon
import { FaInstagram } from "react-icons/fa"; // Import Instagram icon

const Header = () => {
  const fontColor = "#00BFFF"; // Bright blue color
  const bgColor = "black";
  const fontFamily = "'Roboto Condensed', sans-serif"; // Font for header

  return (
    <Box
      as="header"
      bg={bgColor}
      color={fontColor}
      p={4}
      position="relative"
      width="100%"
      shadow="lg" // Add shadow to make header pop
    >
      <Flex align="center" justify="space-between">
        {/* Analytics Dashboard Heading */}
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color={fontColor}
          ml={4}
          fontFamily={fontFamily}
          _hover={{ color: "#FF9A00", transform: "scale(1.05)" }} // Add color change and scale on hover
          transition="all 0.3s ease-in-out" // Smooth transition for hover effect
        >
          Analytics Dashboard
        </Text>

        {/* Navbar Sections */}
        <Flex gap={6} align="center">
          <Link to="/login">
            <Text
              fontSize="lg"
              fontWeight="medium"
              color={fontColor}
              _hover={{ color: "#FF9A00", transform: "scale(1.1)" }} // Scale text and change color on hover
              fontFamily={fontFamily}
              transition="all 0.3s ease-in-out" // Smooth transition for hover effect
            >
              Home
            </Text>
          </Link>
          <Link to="/">
            <Text
              fontSize="lg"
              fontWeight="medium"
              color={fontColor}
              _hover={{ color: "#FF9A00", transform: "scale(1.1)" }} // Scale text and change color on hover
              fontFamily={fontFamily}
              transition="all 0.3s ease-in-out" // Smooth transition for hover effect
            >
              Analytics
            </Text>
          </Link>
          <Link to="/analytics">
            <Text
              fontSize="lg"
              fontWeight="medium"
              color={fontColor}
              _hover={{ color: "#FF9A00", transform: "scale(1.1)" }} // Scale text and change color on hover
              fontFamily={fontFamily}
              transition="all 0.3s ease-in-out" // Smooth transition for hover effect
            >
              Reports
            </Text>
          </Link>
          <Link to="/alerts">
            <Text
              fontSize="lg"
              fontWeight="medium"
              color={fontColor}
              _hover={{ color: "#FF9A00", transform: "scale(1.1)" }} // Scale text and change color on hover
              fontFamily={fontFamily}
              transition="all 0.3s ease-in-out" // Smooth transition for hover effect
            >
              Alerts
            </Text>
          </Link>

          {/* Notification Bell Icon with Dropdown */}
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<IoNotificationsCircle />}
              fontSize="2.5rem" // Size for the notification icon
              color={fontColor}
              variant="ghost"
              aria-label="Notifications"
              _hover={{ color: "#FF9A00", transform: "scale(1.2)" }} // Scale icon and change color on hover
              transition="all 0.3s ease-in-out" // Smooth transition for hover effect
            />
            <MenuList bg={bgColor} color={fontColor}>
              {/* Example Notifications */}
              <MenuItem
                _hover={{ bg: "gray.700", color: fontColor }}
                onClick={() => alert("Notification 1 clicked!")}
              >
                Notification 1
              </MenuItem>
              <MenuItem
                _hover={{ bg: "gray.700", color: fontColor }}
                onClick={() => alert("Notification 2 clicked!")}
              >
                Notification 2
              </MenuItem>
              <MenuItem
                _hover={{ bg: "gray.700", color: fontColor }}
                onClick={() => alert("Notification 3 clicked!")}
              >
                Notification 3
              </MenuItem>
            </MenuList>
          </Menu>

          {/* Instagram and LinkedIn Icons */}
          <a
            href="https://www.instagram.com/synthiqio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              icon={<FaInstagram />}
              fontSize="2rem" // Adjusted size for Instagram icon
              color={fontColor}
              variant="ghost"
              aria-label="Instagram"
              _hover={{ color: "#FF9A00", transform: "scale(1.2)" }} // Scale and change color on hover
              transition="all 0.3s ease-in-out" // Smooth transition for hover effect
            />
          </a>

          <a
            href="https://www.linkedin.com/company/synthiq/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              icon={<CiLinkedin />}
              fontSize="2rem" // Adjusted size for LinkedIn icon
              color={fontColor}
              variant="ghost"
              aria-label="LinkedIn"
              _hover={{ color: "#FF9A00", transform: "scale(1.2)" }} // Scale and change color on hover
              transition="all 0.3s ease-in-out" // Smooth transition for hover effect
            />
          </a>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
