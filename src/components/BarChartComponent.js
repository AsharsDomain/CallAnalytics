import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import callData from '@/callData'; // Import callData from data.js

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = () => {
  // Prepare the data for the chart
  const labels = callData.map(call => new Date(call.call_date).toLocaleDateString()); // Extracting labels from call dates
  const dataValues = callData.map(call => call.call_duration); // Extracting call durations for the dataset

  // Creating gradient color for bars
  const ctx = document.createElement('canvas').getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(54, 162, 235, 1)');
  gradient.addColorStop(1, 'rgba(54, 162, 235, 0.5)');

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Call Duration (minutes)', // Updated label for the chart
        data: dataValues,
        backgroundColor: gradient, // Use gradient for bars
        borderColor: 'rgba(54, 162, 235, 1)', // Border color for bars
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)', // Hover effect
        hoverBorderColor: 'rgba(54, 162, 235, 1)', // Hover border color
        borderRadius: 5, // Rounded corners for bars
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to adapt its height
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white', // Font color for legend text
          font: {
            size: 16, // Increased font size for legend
            weight: 'bold', // Bold legend text
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background for tooltips
        titleColor: 'white', // Font color for tooltip title
        bodyColor: 'white', // Font color for tooltip body
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw} minutes`, // Display duration in minutes
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // Font color for x-axis labels
          font: {
            size: 12, // Font size for x-axis labels
            weight: 'bold', // Bold x-axis labels
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light grid line color
        },
      },
      y: {
        ticks: {
          color: 'white', // Font color for y-axis labels
          font: {
            size: 12, // Font size for y-axis labels
            weight: 'bold', // Bold y-axis labels
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light grid line color
        },
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartComponent;
