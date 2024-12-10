import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { fetchCalls } from './api'; // Import your fetch function

const AnalyticsComponent = () => {
  const { user } = useUser(); // Get the user object from Clerk

  const handleFetchCalls = async () => {
    if (!user || !user.id) {
      console.error("User is not authenticated or user ID is unavailable.");
      return;
    }

    try {
      const data = await fetchCalls(user.id); // Pass the user ID to fetchCalls
      console.log("Fetched analytics data:", data);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  return (
    <div>
      <button onClick={handleFetchCalls}>Fetch Analytics Data</button>
    </div>
  );
};

export default AnalyticsComponent;
