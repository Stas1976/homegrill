import React, { Component } from 'react';

import shortid from 'shortid';
import axios from 'axios';

import Menu from './components/Menu';
import Settings from './components/Settings';
import Orders from './components/Orders';
import Statistics from './components/Statistics';
import Header from './components/Header';

const URL = 'https://enigmatic-cliffs-25405.herokuapp.com/menu/';

class App extends Component {
  state = {
    categories: ['drinks', 'dishes', 'deserts', 'special'],
    active: 'drinks',
    menu: null,
    navItems: ['Orders', 'Statistics', 'Settings'],
    activeTab: 0,
    tables: ['Table 1', 'Table 2', 'Table 3', 'Table 4'],
    orders: [],
    activeTable: 0,
    turnover: []
  };

  addSpecial = async item => {
    const menu = {
      ...this.state.menu,
      special: [...this.state.menu.special, { ...item, id: shortid.generate() }]
    };

    await axios.post(URL, item);

    this.setState({ menu });
  };

  deleteSpecial = async name => {
    console.log(name);
    const special = this.state.menu.special.filter(item => item.name !== name);
    await axios.delete(URL + name);
    this.setState({ menu: { ...this.state.menu, special } });
  };

  switchTable = i => {
    this.setState({ activeTable: i });
  };

  addOrder = order => {
    this.setState({
      orders: [
        ...this.state.orders,
        {
          ...order,
          tableNr: this.state.activeTable,
          date: Date.now(),
          id: shortid.generate()
        }
      ]
    });
  };

  checkOut = tableNr => {
    const check = this.state.orders.filter(order => order.tableNr !== tableNr);

    const turnover = this.state.orders.filter(
      order => order.tableNr === tableNr
    );

    this.setState({
      orders: check,
      turnover: [...this.state.turnover, ...turnover]
    });
  };

  deleteOrder = id => {
    const filerdOrders = this.state.orders.filter(order => order.id !== id);
    this.setState({
      orders: filerdOrders
    });
  };

  handleSelectNavItem = activeTab => this.setState({ activeTab });

  componentDidMount = async () => {
    const response = await axios.get(URL);

    this.setState({
      menu: response.data.menu
    });
  };

  handleSelect = active => this.setState({ active });

  render() {
    const {
      tables,
      navItems,
      orders,
      activeTable,
      activeTab,
      categories,
      active,
      menu,
      turnover
    } = this.state;
    const content = [
      <Orders
        tables={tables}
        switchTable={this.switchTable}
        activeTable={activeTable}
        orders={orders}
        deleteOrder={this.deleteOrder}
        checkOut={this.checkOut}
      />,
      <Statistics turnover={turnover} />,
      <Settings
        menu={menu}
        deleteSpecial={this.deleteSpecial}
        addSpecial={this.addSpecial}
        name={'Settings'}
      />
    ];
    return (
      <div>
        <Header
          navItems={navItems}
          handleSelectNavItem={this.handleSelectNavItem}
          activeTab={activeTab}
        />
        <Menu
          handleSelect={this.handleSelect}
          categories={categories}
          active={active}
          menu={menu}
          addOrder={this.addOrder}
        />
        {content[activeTab]}
      </div>
    );
  }
}

export default App;
