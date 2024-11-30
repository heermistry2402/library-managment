import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ totalBooks, otherCategories }) => {
  // Prepare data for the pie chart
  const data = {
    labels: otherCategories.map(item => item.label),
    datasets: [
      {
        label: 'Book Categories',
        data: otherCategories.map(item => item.value),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Total Books: {totalBooks}</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
