import React from 'react';
import * as Papa from 'papaparse';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const PieChart = ({ chart, adOptions }) => {
  const parsed = Papa.parse(chart.data.csv);

  const colors = adOptions.map((item) => {
    return item.color;
  });

  const clearData = [
    ...parsed.data.slice(0, 1),
    ...parsed.data.slice(2, parsed.data.length),
  ];

  const transpose = (matrix) =>
    matrix[0].map((col, i) => matrix.map((row) => row[i]));
  const transpondedData = transpose(clearData);

  const newChartData = {
    labels: transpondedData[0].slice(1, transpondedData[0].length),
    datasets: [
      {
        data: transpondedData[1].slice(1, transpondedData[1].length),
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div className="gutenberg__chart content__posts">
      <Pie
        options={{
          title: { display: true },
          legend: { display: true },
          showTooltips: true,
        }}
        data={newChartData}
      />
    </div>
  );
};

PieChart.propTypes = {
  chart: PropTypes.any,
  adOptions: PropTypes.any,
};
export default PieChart;
