import { Box, Stack, Text } from "@chakra-ui/react";

const Sidebar = () => {
  const fontColor = "#9B59B6"; // Purple color
  const borderColor = fontColor; // Purple border color

  return (
    <Box
      as="aside"
      position="sticky" // Sticky position to keep the sidebar fixed
      top="0" // Stick to the top of the page
      height="100vh" // Full viewport height
      width={{ base: "full", md: "250px" }} // Responsive width for mobile and larger screens
      bg="black" // Set sidebar background to pitch black
      p={4}
      borderRight={`2px solid ${borderColor}`} // Purple border on the right side
      shadow="md"
      overflowY="auto" // Allow the sidebar content to scroll if it overflows
    >
      <Stack spacing={6}>
        <Text fontSize="2xl" fontWeight="bold" color={fontColor}>
          Sidebar
        </Text>
        {/* Add your sidebar links or components here */}
        <Text fontSize="lg" fontWeight="medium" color={fontColor} _hover={{ textDecoration: "underline" }}>
          Dashboard
        </Text>
        <Text fontSize="lg" fontWeight="medium" color={fontColor} _hover={{ textDecoration: "underline" }}>
          Analytics
        </Text>
        <Text fontSize="lg" fontWeight="medium" color={fontColor} _hover={{ textDecoration: "underline" }}>
          Reports
        </Text>
        <Text fontSize="lg" fontWeight="medium" color={fontColor} _hover={{ textDecoration: "underline" }}>
          Settings
        </Text>
        {/* More items can go here */}
      </Stack>
    </Box>
  );
};

export default Sidebar;
