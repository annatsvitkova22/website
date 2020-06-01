import React from 'react';
import * as Papa from 'papaparse';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const LineChart = ({ chart, adOptions }) => {
  const parsed = Papa.parse(chart.data.csv);

  const clearData = [
    ...parsed.data.slice(0, 1),
    ...parsed.data.slice(2, parsed.data.length),
  ];

  const options = {
    title: { display: true },
    maintainAspectRatio: true,
  };

  const transpose = (matrix) =>
    matrix[0].map((col, i) => matrix.map((row) => row[i]));
  const transpondedData = transpose(clearData);

  const newChartData = {
    labels: transpondedData[0].slice(1, transpondedData[0].length),

    datasets: transpondedData
      .slice(1, transpondedData.length)
      .map((item, index) => {
        return {
          label: item[0],
          data: item.slice(1, item.length).map((i) => parseFloat(i)),
          borderColor: adOptions[index].color,
          fill: 'false',
        };
      }),
  };

  return (
    <div className="gutenberg__chart content__posts">
      <Line options={options} data={newChartData} />
    </div>
  );
};
LineChart.propTypes = {
  chart: PropTypes.any,
  adOptions: PropTypes.any,
};

export default LineChart;
