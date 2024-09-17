import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Data',
        data: [12, 19, 3, 5, 2, 3],
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
          color: '#FF9A00', // Font color for legend text
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`, // Customize tooltip label
        },
        titleColor: '#FF9A00', // Font color for tooltip title
        bodyColor: '#FF9A00', // Font color for tooltip body
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChartComponent;
