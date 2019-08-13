import React from 'react';
import moment from 'moment';

const Statistics = ({ turnover }) => {
  const total = turnover.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);
  const list = turnover.map((item, i) => {
    return (
      <li key={i}>
        {item.name} - {item.price}$
        <span>{moment(item.date).format('MM-DD h:mm:ss')}</span>
      </li>
    );
  });
  return (
    <div className="stats">
      <h2>Statistics</h2>
      <h3>Total: {total.toFixed(2)} $</h3>
      <ul>Order: {list}</ul>
    </div>
  );
};

export default Statistics;
