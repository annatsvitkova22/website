import React, { useState, useEffect } from 'react';
import * as Papa from 'papaparse';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ chart, adOptions, isMobile }) => {
  const [randomColor, setRandomColor] = useState(null);

  const parsed = Papa.parse(chart.data.csv);

  const clearData = [
    ...parsed.data.slice(0, 1),
    ...parsed.data.slice(2, parsed.data.length),
  ];

  const transpose = (matrix) =>
    matrix[0].map((col, i) => matrix.map((row) => row[i]));
  const transpondedData = transpose(clearData);

  useEffect(() => {
    setRandomColor(
      new Array(transpondedData[0].length)
        .fill(1)
        .map(
          (el) =>
            `rgba(${Math.floor(Math.random() * 100)}, 150, ${Math.floor(
              Math.random() * 100
            )}, 0.5)`
        )
    );
  }, []);

  const newChartData = {
    labels: transpondedData[0].slice(1, transpondedData[0].length),
    datasets: transpondedData
      .slice(1, transpondedData.length)
      .map((item, index) => {
        return {
          label: item[0],
          data: item.slice(1, item.length).map((i) => parseFloat(i)),
          backgroundColor: adOptions[index].color
            ? adOptions[index].color
            : randomColor,
        };
      }),
  };

  return (
    <div className="gutenberg__chart content__posts">
      <Bar
        options={{
          title: { display: true },
          legend: { display: isMobile },
          maintainAspectRatio: true,
        }}
        data={newChartData}
      />
    </div>
  );
};

BarChart.propTypes = {
  chart: PropTypes.any,
  adOptions: PropTypes.any,
  isMobile: PropTypes.bool,
};

export default BarChart;
