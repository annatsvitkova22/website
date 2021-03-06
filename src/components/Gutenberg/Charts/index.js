import React, { useEffect, useState } from 'react';
import { useStateLink } from '@hookstate/core';
import axios from 'axios';
import getConfig from 'next/config';
import PropTypes from 'prop-types';

import { AuthStore } from '~/stores/Auth';
import LineChart from '~/components/Gutenberg/Charts/Line';
import BarChart from '~/components/Gutenberg/Charts/Bar';
import GutenbergLoader from '~/components/Loaders/GutenbergLoader';
import PieChart from '~/components/Gutenberg/Charts/Pie';

const { publicRuntimeConfig } = getConfig();
const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const ChartContainer = ({ id }) => {
  const [isMobile, setIsMobile] = useState(null);
  useEffect(() => {
    window.innerWidth <= 570 ? setIsMobile(false) : setIsMobile(true);
  }, []);
  const { apiUrl } = config;

  const authStateLink = useStateLink(AuthStore);
  const authStore = authStateLink.get();

  const [state, setState] = useState({
    chart: null,
    type: null,
    adOptions: null,
    title: null,
  });

  const { chart, type, adOptions, title } = state;

  useEffect(() => {
    if (authStore.token && !chart && !type) {
      loadData();
    }
  }, [authStore]);

  if (!id) return null;

  const loadData = async () => {
    const conf = {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    };
    const formResponse = await axios.get(
      `${apiUrl}/wp-json/visualizer/v1/action/${id}/csv`,
      conf
    );
    const typeResponse = await axios.get(
      `${apiUrl}/wp-json/zmrest/charts?id=${id}`,
      conf
    );

    if (typeResponse && formResponse) {
      setState({
        ...state,
        chart: formResponse.data,
        type: typeResponse.data['visualizer-chart-type'][0],
        adOptions: typeResponse.data['visualizer-settings'][0].series
          ? typeResponse.data['visualizer-settings'][0].series
          : typeResponse.data['visualizer-settings'][0].slices,
        title: typeResponse.data['visualizer-settings'][0].title
          ? typeResponse.data['visualizer-settings'][0].title
          : null,
      });
    }
  };

  if (!chart) {
    return <GutenbergLoader type={'chart'} />;
  }

  switch (type) {
    case 'line':
      return (
        <LineChart
          key={chart.title}
          chart={chart}
          adOptions={adOptions}
          isMobile={isMobile}
          title={title}
        />
      );
    case 'column':
      return (
        <BarChart
          chart={chart}
          adOptions={adOptions}
          isMobile={isMobile}
          title={title}
        />
      );
    case 'pie':
      return (
        <PieChart
          chart={chart}
          adOptions={adOptions}
          isMobile={isMobile}
          title={title}
        />
      );
    default:
      return null;
  }
};

ChartContainer.propTypes = {
  id: PropTypes.any,
};

export default ChartContainer;
