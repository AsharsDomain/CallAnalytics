import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Keep the chart's background color
        borderColor: 'rgba(54, 162, 235, 1)', // Keep the chart's border color
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
          label: (context) => `${context.dataset.label}: ${context.raw}`,
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
          color: 'rgba(255, 255, 255, 0.1)', // Light grid line color (adjust if needed)
        },
      },
      y: {
        ticks: {
          color: '#FF9A00', // Font color for y-axis labels
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light grid line color (adjust if needed)
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChartComponent;
