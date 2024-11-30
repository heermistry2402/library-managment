// src/components/BookChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';

const BookChart = ({ totalBooks }) => {
  const data = {
    labels: ['Total Books'],
    datasets: [
      {
        label: 'Books',
        data: [totalBooks],
        backgroundColor: '#6d1b7b',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />; // Return the Bar chart
};

export default BookChart;
