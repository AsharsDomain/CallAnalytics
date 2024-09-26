import { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel, Heading, VStack, Alert } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Example authentication logic
      if (email === "test@example.com" && password === "password") {
        // Successful login
        localStorage.setItem("authToken", "your-token-here");
        alert("Login successful!");

        // Redirect to the dashboard after successful login
        navigate("/"); // Redirect to the dashboard
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <VStack spacing={4} w="100%" maxW="md" mx="auto" mt={10}>
      <Heading>Login</Heading>
      {error && <Alert status="error">{error}</Alert>}

      {/* Wrap the form in an HTML <form> tag */}
      <Box as="form" w="full" onSubmit={handleLogin}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="password" mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" bgColor="#00BFFF" w="full" mt={4}>
          Login
        </Button>
      </Box>
    </VStack>
  );
}
