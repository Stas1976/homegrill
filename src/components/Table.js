import React from 'react';

const Table = ({
  deleteOrder,
  table,
  activeTable,
  switchTable,
  index,
  orders,
  checkOut
}) => {
  const tableOrders = orders.filter(order => {
    return order.tableNr === index;
  });

  const total = tableOrders.reduce((total, item) => {
    return total + item.price;
  }, 0);

  const order = tableOrders.map((order, i) => {
    return (
      <li className="item" key={i}>
        {order.name}
        <span
          onClick={() => {
            deleteOrder(order.id);
          }}
          className="delete"
        >
          x
        </span>
        <span className="price">{order.price.toFixed(2)}€</span>
      </li>
    );
  });

  // const table = tables.map(table => console.log(table));

  return (
    <div
      className={index === activeTable ? 'active-table table' : 'table'}
      onClick={() => switchTable(index)}
    >
      <h4>{table}</h4>
      <ul>{order}</ul>
      <nav>
        <button
          onClick={() => {
            checkOut(index);
          }}
          className="btn"
        >
          Check Out
        </button>
        <h5>Total: {total.toFixed(2)}</h5>
      </nav>
    </div>
  );
};

export default Table;
