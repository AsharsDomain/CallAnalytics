import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import callData from '@/callData'; // Importing callData from data.js

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartComponent = () => {
  // Prepare the data for the chart
  const labels = callData.map(call => new Date(call.call_date).toLocaleDateString()); // Extracting labels from call dates
  const dataValues = callData.map(call => call.call_cost); // Extracting call costs for the dataset

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Call Costs',
        data: dataValues,
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color
        fill: true,  // Ensures the area under the line is filled
        tension: 0.4,  // Curved lines
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white', // Font color for legend text
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: $${context.raw.toFixed(2)}`, // Adjusting label format
        },
        titleColor: 'white', // Font color for tooltip title
        bodyColor: 'white', // Font color for tooltip body
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // Font color for x-axis labels
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light grid line color
        },
      },
      y: {
        ticks: {
          color: 'white', // Font color for y-axis labels
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
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartComponent;
