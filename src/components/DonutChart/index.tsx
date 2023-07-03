import React from 'react';
import ReactEcharts from 'echarts-for-react';

interface DonutChartProps {
  data: { name: string; value: number }[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const colors = ['#FF8A48', '#4F75FF']; // Mảng màu sắc tùy chỉnh cho các phần tử

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '80%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            formatter: function (params: any) {
              return `{b|${params.name}}\n{c|${params.value}}`;
            },
            rich: {
              b: {
                fontSize: 14,
                lineHeight: 20,
                borderRadius: 4,
                backgroundColor: '#fff',
                padding: [2, 6],
              },
              c: {
                fontSize: 12,
                lineHeight: 16,
              },
            },
          },
        },
        labelLine: {
          show: false,
        },
        data: data.map((item, index) => {
          return {
            name: item.name,
            value: item.value,
            itemStyle: {
              color: colors[index % colors.length], // Áp dụng màu sắc từ mảng colors theo chỉ số của phần tử trong dữ liệu
            },
          };
        }),
      },
    ],
  };

  return <ReactEcharts option={option} style={{ height: '300px' }} />;
};

export default DonutChart;
