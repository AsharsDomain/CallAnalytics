import React from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import { useAuth, SignInButton, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContent = () => {
  const { isLoaded, getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const token = await getToken();
    const id = user?.id; // Ensure user is loaded before accessing id

    if (id) {
      axios
        .post('http://localhost:3000/api/login', { token, id })
        .then((response) => {
          console.log(response.data); // Handle the successful response
          navigate('/'); // Navigate to the homepage after successful login
        })
        .catch((error) => console.error(error));
    }
  };

  const bgGradient = useColorModeValue(
    'linear(to-r, #1662d4, #1e90ff)',
    'linear(to-r, #1e3a8a, #1e40af)'
  );

  if (!isLoaded) {
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgGradient={bgGradient}
        color="white"
      >
        <Spinner size="xl" />
        <Text ml={4}>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient={bgGradient}
      color="white"
      p={4}
    >
      <VStack
        spacing={8}
        bg="whiteAlpha.200"
        p={8}
        borderRadius="lg"
        boxShadow="xl"
        w={{ base: '90%', md: '50%', lg: '40%' }}
        textAlign="center"
      >
        <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} color="white">
          {user ? `Welcome, ${user.firstName || 'User'}!` : 'Sign In to Continue'}
        </Heading>
        <Text fontSize="lg" color="whiteAlpha.800">
          Access personalized features and insights by signing in.
        </Text>
        {!user && (
          <SignInButton>
            <Button
              bg="blue.600"
              _hover={{ bg: 'blue.500' }}
              _active={{ bg: 'blue.700' }}
              size="lg"
              px={6}
              color="white"
            >
              Sign In
            </Button>
          </SignInButton>
        )}
        {user && (
          <Button
            bg="green.500"
            _hover={{ bg: 'green.400' }}
            _active={{ bg: 'green.600' }}
            size="lg"
            px={6}
            color="white"
            onClick={handleLogin}
          >
            Continue
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default AuthContent;
