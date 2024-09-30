import { useState, useEffect } from 'react';
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
import Sidebar from './Sidebar';
import Header from './Header';

const WhiteLabelingPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [logoUrl, setLogoUrl] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#00BFFF');
  const [layout, setLayout] = useState('default');
  const [headingText, setHeadingText] = useState(() => {
    return localStorage.getItem('customHeading') || 'White Labeling Settings';
  });
  const [customUrl, setCustomUrl] = useState(() => {
    // Load saved custom URL from localStorage
    return localStorage.getItem('customUrl') || '';
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem('customHeading', headingText);
    localStorage.setItem('logoUrl', logoUrl);
    localStorage.setItem('customUrl', customUrl);
    localStorage.setItem('primaryColor', primaryColor);
    setSuccessMessage('Customization settings saved successfully!');
  };

  return (
    <ColorModeProvider>
      <Flex direction="column" height="100vh">
        {/* Header Component with headingText prop */}
        <Header headingText={headingText} />

        <Flex flex="1">
          {/* Sidebar Component */}
          <Sidebar />

          {/* Main Content Area */}
          <Box flex="1" p={5}>
            <VStack spacing={4} w="100%" maxW="md" mx="auto" mt={10}>
              {/* Main Heading */}
              <Heading>White Labeling Settings</Heading>

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

              {/* Dashboard Logo URL Input */}
              <FormControl id="logoUrl">
                <FormLabel>Dashboard Logo URL</FormLabel>
                <Input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="Enter logo URL"
                />
              </FormControl>

              {/* Custom URL Input */}
              <FormControl id="customUrl">
                <FormLabel>Custom Website Address</FormLabel>
                <Input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="Enter custom website address"
                />
              </FormControl>

              {/* Primary Color Input */}
              <FormControl id="primaryColor">
                <FormLabel>Primary Color</FormLabel>
                <Input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                />
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
