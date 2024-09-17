import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartComponent = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Temperature',
        data: [0, 5, 10, 15, 20, 25, 30],
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color
        fill: true,
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
          color: '#FF9A00', // Font color for legend text
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}°C`,
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

  return <Line data={data} options={options} />;
};

export default LineChartComponent;
