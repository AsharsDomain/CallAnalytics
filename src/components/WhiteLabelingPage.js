import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  ColorModeProvider,
  useColorMode,
  Alert,
  Flex,
} from '@chakra-ui/react';
import Sidebar from './Sidebar'; // Import the Sidebar component
import Header from './Header'; // Import the Header component

const WhiteLabelingPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [logoUrl, setLogoUrl] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#00BFFF'); // Default color
  const [layout, setLayout] = useState('default'); // Default layout
  const [headingText, setHeadingText] = useState('White Labeling Settings'); // State for customizable heading
  const [successMessage, setSuccessMessage] = useState('');

  const handleSave = () => {
    // Logic to save the customization settings (e.g., API call)
    setSuccessMessage('Customization settings saved successfully!');
  };

  return (
    <ColorModeProvider>
      <Flex direction="column" height="100vh">
        {/* Header Component */}
        <Header />

        <Flex flex="1">
          {/* Sidebar Component */}
          <Sidebar />

          {/* Main Content Area */}
          <Box flex="1" p={5}>
            <VStack spacing={4} w="100%" maxW="md" mx="auto" mt={10}>
              {/* Single Main Heading */}
              <Heading>{headingText}</Heading>

              {/* Customizable Heading Input */}
              <FormControl id="headingText">
                <FormLabel>Custom Heading</FormLabel>
                <Input
                  type="text"
                  value={headingText}
                  onChange={(e) => setHeadingText(e.target.value)}
                  placeholder="Enter custom heading"
                />
              </FormControl>

              {successMessage && <Alert status="success">{successMessage}</Alert>}

              <FormControl id="logoUrl">
                <FormLabel>Dashboard Logo URL</FormLabel>
                <Input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="Enter logo URL"
                />
              </FormControl>

              <FormControl id="primaryColor">
                <FormLabel>Primary Color</FormLabel>
                <Input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                />
              </FormControl>

              <FormControl id="layout">
                <FormLabel>Layout Preference</FormLabel>
                <Select
                  value={layout}
                  onChange={(e) => setLayout(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="compact">Compact</option>
                  <option value="expanded">Expanded</option>
                </Select>
              </FormControl>

              <Button colorScheme="blue" onClick={handleSave}>
                Save Customizations
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </ColorModeProvider>
  );
};

export default WhiteLabelingPage;
