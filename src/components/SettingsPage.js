import { Box, Flex, Heading, Text, Input, Button, Select, Checkbox, Stack } from "@chakra-ui/react";
import { useState } from "react";
import Sidebar from "@/components/Sidebar"; // Adjust the import path as necessary

const SettingsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [notifications, setNotifications] = useState({
    emailNotifications: false,
    smsNotifications: false,
  });
  const [timeZone, setTimeZone] = useState("UTC");
  const [currency, setCurrency] = useState("USD");

  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const timeZones = ["UTC", "GMT", "CET", "EST", "PST"];
  const currencies = ["USD", "EUR", "GBP", "INR"];

  const handleSaveProfile = () => {
    localStorage.setItem(
      "userProfile",
      JSON.stringify({ name, email, instagramUrl, linkedinUrl, notifications, timeZone, currency })
    );
    alert("Profile updated successfully!");
  };

  const handleNotificationChange = (event) => {
    const { name, checked } = event.target;
    setNotifications((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    // Simulate password change (here you might want to send a request to your backend)
    alert("Password changed successfully!");
    // Reset password fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Box>
      <Flex direction={{ base: "column", md: "row" }} height="100vh">
        {/* Sidebar will take full width on mobile */}
        <Box display={{ base: "block", md: "block" }}>
          <Sidebar />
        </Box>

        {/* Flex wrapper for user settings */}
        <Flex
          flex="1"
          p={{ base: 4, md: 6 }}
          align="center"
          justify="center"
          flexDirection="column" // Ensure column direction for centering content
        >
          <Box
            w="100%"
            maxW="400px"
            textAlign="center"
            bg={{ base: "gray.900", md: "transparent" }}
            p={{ base: 6, md: 0 }}
            borderRadius={{ base: "md", md: "none" }}
            mx="auto" // Horizontally center the Box
          >
            <Heading as="h1" size="lg" mb={4} color="blue.400">
              User Settings
            </Heading>

            {/* Profile Information Section */}
            <Text color="white" mb={2}>Profile Information:</Text>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              mb={4}
              bg="gray.700"
              color="white"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              mb={4}
              bg="gray.700"
              color="white"
            />

            {/* Social Media URLs Section */}
            <Text color="white" mt={4}>Social Media URLs:</Text>
            <Input
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              placeholder="Enter Instagram URL"
              mb={4}
              bg="gray.700"
              color="white"
            />
            <Input
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="Enter LinkedIn URL"
              mb={4}
              bg="gray.700"
              color="white"
            />

            {/* Notification Preferences Section */}
            <Text color="white" mt={4}>Notification Preferences:</Text>
            <Stack spacing={2} mb={4}>
              <Checkbox
                name="emailNotifications"
                isChecked={notifications.emailNotifications}
                onChange={handleNotificationChange}
                colorScheme="blue"
              >
                Email Notifications
              </Checkbox>
              <Checkbox
                name="smsNotifications"
                isChecked={notifications.smsNotifications}
                onChange={handleNotificationChange}
                colorScheme="blue"
              >
                SMS Notifications
              </Checkbox>
            </Stack>

            {/* Time Zone Selection */}
            <Text color="white" mt={4}>Time Zone:</Text>
            <Select
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
              mb={4}
              bg="gray.700"
              color="white"
              borderColor="gray.600"
              _focus={{ borderColor: "#FF9A00", boxShadow: "0 0 0 1px #FF9A00" }}
              sx={{
                '& option': {
                  backgroundColor: 'black',
                  color: 'white',
                },
              }}
            >
              {timeZones.map((zone) => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </Select>

            {/* Currency Selection */}
            <Text color="white" mt={4}>Currency:</Text>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              mb={4}
              bg="gray.700"
              color="white"
              borderColor="gray.600"
              _focus={{ borderColor: "#FF9A00", boxShadow: "0 0 0 1px #FF9A00" }}
              sx={{
                '& option': {
                  backgroundColor: 'black',
                  color: 'white',
                },
              }}
            >
              {currencies.map((curr) => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </Select>

            {/* Change Password Section */}
            <Text color="white" mt={4}>Change Password:</Text>
            <Input
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              type="password"
              mb={4}
              bg="gray.700"
              color="white"
            />
            <Input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              type="password"
              mb={4}
              bg="gray.700"
              color="white"
            />
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              type="password"
              mb={4}
              bg="gray.700"
              color="white"
            />
            <Button onClick={handleChangePassword} colorScheme="blue" mt={4} w="full">
              Change Password
            </Button>

            {/* Save Button */}
            <Button onClick={handleSaveProfile} colorScheme="blue" mt={4} w="full">
              Save Changes
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SettingsPage;
