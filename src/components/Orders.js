import React from 'react';

import Table from './Table';
const Orders = ({
  checkOut,
  deleteOrder,
  tables,
  switchTable,
  activeTable,
  orders
}) => {
  const Tables = tables.map((table, i) => {
    return (
      <Table
        table={table}
        key={i}
        index={i}
        activeTable={activeTable}
        switchTable={switchTable}
        orders={orders}
        deleteOrder={deleteOrder}
        checkOut={checkOut}
      />
    );
  });

  return <div className="orders">{Tables}</div>;
};

export default Orders;
