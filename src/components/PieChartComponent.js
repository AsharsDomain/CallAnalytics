import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import callData from "../callData.js"

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ callData }) => {
  const [pieData, setPieData] = useState({ labels: [], data: [] });

  useEffect(() => {
    if (callData.length > 0) {
      // Group outcomes by their count
      const outcomeCounts = groupOutcomes(callData);

      // Prepare the labels and data for the pie chart
      const labels = Object.keys(outcomeCounts);
      const data = Object.values(outcomeCounts);

      setPieData({ labels, data });
    }
  }, [callData]);

  const data = {
    labels: pieData.labels,
    datasets: [
      {
        label: 'Call Outcomes',
        data: pieData.data,
        backgroundColor: [
          '#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#ff9f40',
        ],
        borderColor: '#fff',
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
          color: '#FF9A00',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`, 
        },
        titleColor: '#FF9A00',
        bodyColor: '#FF9A00',
      },
    },
  };

  return <Pie data={data} options={options} />;
};

// Group outcomes by count
const groupOutcomes = (data) => {
  return data.reduce((acc, curr) => {
    acc[curr.outcome] = (acc[curr.outcome] || 0) + 1;
    console.log(acc);
    return acc;
  }, {});
};

export default PieChartComponent;
