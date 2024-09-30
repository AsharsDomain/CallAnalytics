// BarChartComponent.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import callData from '@/callData'; // Import callData from data.js

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = () => {
  // Prepare the data for the chart
  const labels = callData.map(call => new Date(call.call_date).toLocaleDateString()); // Extracting labels from call dates
  const dataValues = callData.map(call => call.call_duration); // Extracting call durations for the dataset

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Call Duration (minutes)', // Updated label for the chart
        data: dataValues,
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Background color for bars
        borderColor: 'rgba(54, 162, 235, 1)', // Border color for bars
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FF9A00', // Font color for legend text
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw} minutes`, // Display duration in minutes
        },
        titleColor: '#FF9A00', // Font color for tooltip title
        bodyColor: '#FF9A00', // Font color for tooltip body
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#FF9A00', // Font color for x-axis labels
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light grid line color
        },
      },
      y: {
        ticks: {
          color: '#FF9A00', // Font color for y-axis labels
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light grid line color
        },
      },
    },
  };

  return (
    <div>
      {/* Optional Title */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartComponent;
