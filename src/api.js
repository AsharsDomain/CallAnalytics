export const fetchCalls = async (userId) => {
  if (!userId) {
    throw new Error("User is not authenticated.");
  }

  try {
    const response = await fetch('http://localhost:3000/api/analytics', {
      method: 'POST', // Adjust method as per API requirements
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId }), // Pass the ID dynamically
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
