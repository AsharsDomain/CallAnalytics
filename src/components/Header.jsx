import { useState, useEffect } from "react";
import { Box, Flex, Text, IconButton, Menu, MenuButton, MenuList, MenuItem, Image } from "@chakra-ui/react"; // Import Image component
import { Link } from "react-router-dom";
import { IoNotificationsCircle } from "react-icons/io5";
import { CiLinkedin } from "react-icons/ci"; // Import LinkedIn icon
import { FaInstagram } from "react-icons/fa"; // Import Instagram icon

const Header = () => {
  const fontColor = "#00BFFF"; // Bright blue color
  const bgColor = "black";
  const fontFamily = "'Roboto Condensed', sans-serif"; // Font for header

  // State for dynamic heading, logo URL, and social media URLs
  const [headingText, setHeadingText] = useState("White Labeling Settings");
  const [logoUrl, setLogoUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState(""); // State for Instagram URL
  const [linkedinUrl, setLinkedinUrl] = useState(""); // State for LinkedIn URL

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

          {/* Updated Instagram and LinkedIn Icons */}
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
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
          </a>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
