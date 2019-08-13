import React, { Component } from 'react';

class Settings extends Component {
  state = {
    name: '',
    price: '',
    error: ''
  };

  onInputChange = e => {
    const value =
      e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    this.setState({ [e.target.name]: value });
  };

  render() {
    const { name, price } = this.state;
    const items = this.props.menu.special.map((item, index) => {
      return (
        <li key={index}>
          {item.name}
          <div
            className="delete"
            onClick={() => this.props.deleteSpecial(item.name)}
          >
            x
          </div>
          <span>{item.price}€</span>
        </li>
      );
    });
    return (
      <div className="settings">
        <h3>{this.props.name}</h3>
        {this.state.error && (
          <div style={{ color: 'red' }}>{this.state.error}</div>
        )}
        <form
          className="controls"
          onSubmit={e => {
            e.preventDefault();
            if (!this.state.name) {
              this.setState({ error: 'missing dish name' });
            } else if (!this.state.price) {
              this.setState({ error: 'missing dish price' });
            } else {
              this.props.addSpecial(this.state);
            }
          }}
        >
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.onInputChange}
            placeholder="name"
          />
          <input
            type="number"
            name="price"
            value={price}
            onChange={this.onInputChange}
            placeholder="price"
          />
          <button className="btn">Add</button>
          <ul>{items}</ul>
        </form>
      </div>
    );
  }
}

export default Settings;
