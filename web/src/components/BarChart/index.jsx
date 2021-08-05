import React from 'react';
import {
  Bar,
  BarChart as ReBarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import styles from './BarChart.module.css';

export const BarChart = ({
  data,
  xDataKey,
  barDataKey,
  width,
  height,
  title,
  handleClick,
}) => {
  return (
    <div className={styles.root}>
      {title && <h3>{title}</h3>}
      <ReBarChart
        width={width}
        height={height}
        data={data}
        onClick={handleClick}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xDataKey} angle="305" minTickGap={50} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={barDataKey} fill="#8884d8" />
      </ReBarChart>
    </div>
  );
};
