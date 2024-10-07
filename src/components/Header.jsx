import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoNotificationsCircle } from "react-icons/io5";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  const fontColor = "#1662D4"; // Bright blue color
  const bgColor = "black";
  const fontFamily = "'Roboto Condensed', sans-serif";

  // State for dynamic heading, logo URL, and social media URLs
  const [headingText, setHeadingText] = useState("White Labeling Settings");
  const [logoUrl, setLogoUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState(""); 
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  // Fetch heading, logo, and social media URLs from localStorage when the component mounts
  useEffect(() => {
    const savedHeading = localStorage.getItem("customHeading");
    const savedLogoUrl = localStorage.getItem("logoUrl");
    const savedInstagramUrl = localStorage.getItem("instagramUrl");
    const savedLinkedinUrl = localStorage.getItem("linkedinUrl");

    if (savedHeading) setHeadingText(savedHeading);
    if (savedLogoUrl) setLogoUrl(savedLogoUrl);
    if (savedInstagramUrl) setInstagramUrl(savedInstagramUrl);
    if (savedLinkedinUrl) setLinkedinUrl(savedLinkedinUrl);
  }, []);

  // Logout function
  const handleLogout = () => {
    alert("You have logged out!");
    // Implement actual logout logic here
  };

  return (
    <Box
      as="header"
      bg={bgColor}
      color={fontColor}
      p={4}
      position="relative"
      width="100%"
      shadow="lg"
    >
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={fontColor}
            ml={4}
            fontFamily={fontFamily}
            _hover={{ color: "#FF9A00", transform: "scale(1.05)" }}
            transition="all 0.3s ease-in-out"
          >
            {headingText}
          </Text>

          {logoUrl && (
            <Image
              src={logoUrl}
              alt="Dashboard Logo"
              boxSize="50px"
              ml={4}
              objectFit="contain"
            />
          )}
        </Flex>

        <Flex gap={6} align="center">
          <Link to="/login">
            <Text
              fontSize="lg"
              fontWeight="medium"
              color={fontColor}
              _hover={{ color: "#FF9A00", transform: "scale(1.1)" }}
              fontFamily={fontFamily}
              transition="all 0.3s ease-in-out"
            >
              Home
            </Text>
          </Link>
          <Link to="/">
            <Text
              fontSize="lg"
              fontWeight="medium"
              color={fontColor}
              _hover={{ color: "#FF9A00", transform: "scale(1.1)" }}
              fontFamily={fontFamily}
              transition="all 0.3s ease-in-out"
            >
              Analytics
            </Text>
          </Link>
          <Link to="/analytics">
            <Text
              fontSize="lg"
              fontWeight="medium"
              color={fontColor}
              _hover={{ color: "#FF9A00", transform: "scale(1.1)" }}
              fontFamily={fontFamily}
              transition="all 0.3s ease-in-out"
            >
              Reports
            </Text>
          </Link>
          <Link to="/alerts">
            <Text
              fontSize="lg"
              fontWeight="medium"
              color={fontColor}
              _hover={{ color: "#FF9A00", transform: "scale(1.1)" }}
              fontFamily={fontFamily}
              transition="all 0.3s ease-in-out"
            >
              Alerts
            </Text>
          </Link>

          {/* Notifications Menu */}
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<IoNotificationsCircle />}
              fontSize="2.5rem"
              color={fontColor}
              variant="ghost"
              aria-label="Notifications"
              _hover={{ color: "#FF9A00", transform: "scale(1.2)" }}
              transition="all 0.3s ease-in-out"
            />
            <MenuList bg={bgColor} color={fontColor}>
              <MenuItem _hover={{ bg: "gray.700" }} onClick={() => alert("Notification 1 clicked!")}>
                Notification 1
              </MenuItem>
              <MenuItem _hover={{ bg: "gray.700" }} onClick={() => alert("Notification 2 clicked!")}>
                Notification 2
              </MenuItem>
              <MenuItem _hover={{ bg: "gray.700" }} onClick={() => alert("Notification 3 clicked!")}>
                Notification 3
              </MenuItem>
            </MenuList>
          </Menu>

          {/* <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
            <IconButton
              icon={<FaInstagram />}
              fontSize="2rem"
              color={fontColor}
              variant="ghost"
              aria-label="Instagram"
              _hover={{ color: "#FF9A00", transform: "scale(1.2)" }}
              transition="all 0.3s ease-in-out"
            />
          </a>

          
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
            <IconButton
              icon={<CiLinkedin />}
              fontSize="2rem"
              color={fontColor}
              variant="ghost"
              aria-label="LinkedIn"
              _hover={{ color: "#FF9A00", transform: "scale(1.2)" }}
              transition="all 0.3s ease-in-out"
            />
          </a> */}

          {/* Profile Menu */}
          <Menu>
            <MenuButton
              as={IconButton}
              icon={
                <Avatar
                  bg={isHovered ? "orange" : "#1662D4"} // Change background color based on hover state
                  color="black"
                  icon={<FaRegUser />}
                  boxSize="40px"
                  borderColor="black"
                  borderWidth="2px"
                  onMouseEnter={() => setIsHovered(true)} // Set hover state to true
                  onMouseLeave={() => setIsHovered(false)} // Set hover state to false
                />
              }
              variant="ghost"
              aria-label="Profile"
              _hover={{ 
                transform: "scale(1.2)", 
              }}
              transition="all 0.3s ease-in-out"
              color={fontColor} 
            />
            <MenuList bg={bgColor} color={fontColor}>
              <MenuItem bg="black" _hover={{ bg: "gray.700" }} onClick={() => alert("View Profile clicked!")}>
                View Profile
              </MenuItem>
              <MenuItem bg="black" _hover={{ bg: "gray.700" }} onClick={() => alert("Account Settings clicked!")}>
                Account Settings
              </MenuItem>
              <MenuItem bg="black" _hover={{ bg: "gray.700" }} onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
