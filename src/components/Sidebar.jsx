import {
  Box,
  Stack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowDropDown, MdSettings, MdAttachMoney, MdReport } from "react-icons/md"; // Icons for Settings, Expenses, Reports
import { HiMenu, HiX } from "react-icons/hi"; // Icons for mobile menu
import { FaTools, FaClipboardList } from "react-icons/fa"; // Additional icons

const Sidebar = () => {
  const fontColor = "#1662D4"; // Bright blue color for the font
  const hoverColor = "#FF9A00"; // Hover color for font
  const transitionStyle = "all 0.3s ease-in-out"; // Common transition for smooth effects
  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation
  const { isOpen, onToggle } = useDisclosure(); // Manage mobile menu open/close state

  const handleRoleSelection = (role) => {
    if (role === "Admin") {
      navigate("/admin"); // Navigate to the Admin page when Admin is selected
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <Box display={{ base: "block", md: "none" }} p={4}>
        <IconButton
          aria-label="Toggle Sidebar"
          icon={isOpen ? <HiX /> : <HiMenu />}
          onClick={onToggle}
          colorScheme="teal"
          variant="outline"
        />
      </Box>

      <Box
        as="aside"
        position={{ base: "absolute", md: "sticky" }} // Absolute for mobile, sticky for desktop
        top="0"
        left={isOpen ? "0" : "-100%"} // Off-screen for mobile when closed
        height="100vh"
        width={{ base: "full", md: "250px" }} // Full width on mobile, fixed on desktop
        bg="black"
        p={4}
        shadow="md"
        overflowY="auto"
        transition="left 0.3s ease-in-out, width 0.3s ease-in-out" // Smooth transitions
        zIndex="overlay" // Ensure the sidebar overlays other content
      >
        <Stack spacing={6}>
          <Link to="/whitelabel">
            <Text
              fontSize="lg"
              fontWeight="medium"
              color={fontColor}
              display="flex"
              alignItems="center"
              _hover={{ fontSize: "xl", color: hoverColor }}
              transition={transitionStyle}
            >
              <Icon as={FaTools} mr={2} /> {/* Add icon here */}
              Customize
            </Text>
          </Link>

          <Link to="/call-expense">
            <Text
              fontSize="lg"
              fontWeight="medium"
              color={fontColor}
              display="flex"
              alignItems="center"
              _hover={{ fontSize: "xl", color: hoverColor }}
              transition={transitionStyle}
            >
              <Icon as={MdAttachMoney} mr={2} /> {/* Add icon here */}
              Expenses
            </Text>
          </Link>

          <Link to="/reports">
            <Text
              fontSize="lg"
              fontWeight="medium"
              color={fontColor}
              display="flex"
              alignItems="center"
              _hover={{ fontSize: "xl", color: hoverColor }}
              transition={transitionStyle}
            >
              <Icon as={MdReport} mr={2} /> {/* Add icon here */}
              Reports
            </Text>
          </Link>

          <Link to="/settings">
            <Text
              fontSize="lg"
              fontWeight="medium"
              color={fontColor}
              display="flex"
              alignItems="center"
              _hover={{ fontSize: "xl", color: hoverColor }}
              transition={transitionStyle}
            >
              <Icon as={MdSettings} mr={2} /> {/* Add icon here */}
              Settings
            </Text>
          </Link>

          {/* Role Dropdown Menu Styled as a Link */}
          <Menu>
            <MenuButton
              as={Text}
              fontSize="lg"
              fontWeight="medium"
              color={fontColor}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              cursor="pointer"
              _hover={{ fontSize: "xl", color: hoverColor }}
              transition={transitionStyle}
            >
              <Icon as={FaClipboardList} mr={2} /> {/* Add icon here */}
              Role
              <Icon as={MdArrowDropDown} ml={2} boxSize={6} />
            </MenuButton>
            <MenuList bg="black" borderColor={hoverColor}>
              <MenuItem
                bg="black"
                _hover={{ bg: "gray.700" }}
                color={fontColor}
                onClick={() => handleRoleSelection("Guest")}
              >
                Guest
              </MenuItem>
              <MenuItem
                bg="black"
                _hover={{ bg: "gray.700" }}
                color={fontColor}
                onClick={() => handleRoleSelection("Admin")}
              >
                Admin
              </MenuItem>
              <MenuItem
                bg="black"
                _hover={{ bg: "gray.700" }}
                color={fontColor}
                onClick={() => handleRoleSelection("Agency")}
              >
                Agency
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Box>
    </>
  );
};

export default Sidebar;
