import {
  Box,
  Stack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { MdArrowDropDown } from "react-icons/md";

const Sidebar = () => {
  const fontColor = "#00BFFF"; // Bright blue color for the font
  const hoverColor = "#FF9A00"; // Hover color for font
  const transitionStyle = "all 0.3s ease-in-out"; // Common transition for smooth effects
  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation

  const handleRoleSelection = (role) => {
    if (role === "Admin") {
      navigate("/admin"); // Navigate to the Admin page when Admin is selected
    }
  };

  return (
    <Box
      as="aside"
      position="sticky" // Sticky position to keep the sidebar fixed
      top="0" // Stick to the top of the page
      height="100vh" // Full viewport height
      width={{ base: "full", md: "250px" }} // Responsive width for mobile and larger screens
      bg="black" // Set sidebar background to pitch black
      p={4}
      shadow="md"
      overflowY="auto" // Allow the sidebar content to scroll if it overflows
      transition="width 0.3s ease-in-out" // Smooth transition for the sidebar's width
    >
      <Stack spacing={6}>
        <Link to="/whitelabel">
          <Text
            fontSize="lg"
            fontWeight="medium"
            color={fontColor}
            _hover={{ fontSize: "xl", color: hoverColor }}
            transition={transitionStyle}
          >
            Customize
          </Text>
        </Link>

        <Link to="/call-expense">
          <Text
            fontSize="lg"
            fontWeight="medium"
            color={fontColor}
            _hover={{ fontSize: "xl", color: hoverColor }}
            transition={transitionStyle}
          >
            Expenses
          </Text>
        </Link>

        <Link to="/reports">
          <Text
            fontSize="lg"
            fontWeight="medium"
            color={fontColor}
            _hover={{ fontSize: "xl", color: hoverColor }}
            transition={transitionStyle}
          >
            Reports
          </Text>
        </Link>

        <Link to="/settings">
          <Text
            fontSize="lg"
            fontWeight="medium"
            color={fontColor}
            _hover={{ fontSize: "xl", color: hoverColor }}
            transition={transitionStyle}
          >
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
            cursor="pointer" // Make the text look clickable
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            _hover={{ fontSize: "xl", color: hoverColor }}
            transition={transitionStyle}
          >
            Role
            <Icon as={MdArrowDropDown} ml={2} boxSize={6} />{" "}
            {/* Add dropdown icon on the right */}
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
              onClick={() => handleRoleSelection("Admin")} // Navigate to Admin page
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
  );
};

export default Sidebar;
