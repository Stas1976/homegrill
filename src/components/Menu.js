import React from 'react';
import drinks from '../images/drinks.png';
import cake from '../images/cake.png';
import main_dish from '../images/main_dish.png';
import special from '../images/special.png';

const images = [drinks, cake, main_dish, special];

const Menu = ({ categories, handleSelect, active, menu, addOrder }) => {
  const categorie = categories.map((cat, i) => {
    return (
      <div
        key={i}
        className={active === cat ? 'category active-cat' : 'category'}
        onClick={() => handleSelect(cat)}
      >
        <img src={images[i]} alt="" />
        <h3>{cat}</h3>
      </div>
    );
  });
  // console.log(active);
  const menuItems =
    menu &&
    menu[active].map((drink, i) => {
      return (
        <li key={i} onClick={() => addOrder(drink)}>
          {drink.name}
          <span>{drink.price}€</span>
        </li>
      );
    });

  return (
    <div className="menu">
      <div className="categories">{categorie}</div>
      <ul className="menu-items">{menuItems}</ul>
      {!menu && <div className="loader" />}
    </div>
  );
};

export default Menu;
