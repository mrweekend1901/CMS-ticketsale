import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from 'chart.js';
import { useState } from 'react';
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
);

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function LineChart() {
  const [data, setData] = useState({
    labels: month,
    datasets: [
      {
        label: 'Thống kê theo tháng',
        data: [2200, 3000, 3500, 4000, 2900, 4200, 3000, 2700, 1500, 3000, 3500, 4000],
        backgroundColor: (context: any) => {
          const bgColor = ['rgba(206, 221, 255, 0)', 'rgba(206, 221, 255, 1)'];

          if (!context.chart.chartArea) {
            return;
          }
          const {
            ctx,
            data,
            chartArea: { top, bottom },
          } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
          gradientBg.addColorStop(1, bgColor[0]);
          gradientBg.addColorStop(0, bgColor[1]);

          return gradientBg;
        },
        borderColor: '#5185F7',
        tension: 0.4,
        fill: true,
        pointStyle: 'circle',
        pointBackgroundColor: '#5185F7',
        pointBorderWidth: 2,
        pointBorderColor: '#fff',
        pointRadius: 5,
      },
    ],
  });

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, // Ẩn hiển thị label
      },
    },
  };

  return (
    <div className="line-chart" style={{ height: '330px' }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;
