// components/Card.js
import { Box, Text } from '@chakra-ui/react';

const Card = ({ title, value }) => {
  return (
    <Box
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      p={4}
      shadow="sm"
      bg="white"
      textAlign="center"
      width="150px"
      height="100px"
    >
      <Text fontWeight="bold" fontSize="lg">
        {title}
      </Text>
      <Text fontSize="xl" mt={2} color="blue.500">
        {value}
      </Text>
    </Box>
  );
};

export default Card;
