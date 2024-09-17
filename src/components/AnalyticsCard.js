import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export default function AnalyticsCard({ title, value, bg, shadow, borderRadius, _hover }) {
  const cardBg = bg || useColorModeValue("white", "gray.700");
  const borderColor = "#9B59B6"; // Purple color

  return (
    <Box
      bg={cardBg}
      p={6}
      borderRadius={borderRadius || "lg"}
      shadow={shadow || "lg"}
      _hover={_hover || { transform: "scale(1.05)", transition: "all 0.3s ease-in-out" }}
      transition="transform 0.3s"
      textAlign="center"
      border="1px solid"
      borderColor={borderColor} // Purple border color
    >
      <Text fontSize="lg" fontWeight="semibold" color="#FF9A00" mb={2}>
        {title}
      </Text>
      <Text fontSize="3xl" fontWeight="bold" color="#FF9A00">
        {value}
      </Text>
    </Box>
  );
}
