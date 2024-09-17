// src/app/api.js

export const fetchCalls = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/calls");
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
