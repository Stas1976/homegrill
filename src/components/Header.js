import React from 'react';

const Header = ({ activeTab, navItems, handleSelectNavItem }) => {
  const tabs = navItems.map((tab, i) => {
    return (
      <li
        className={i === activeTab ? 'active' : null}
        onClick={() => handleSelectNavItem(i)}
        key={i}
      >
        {tab}
      </li>
    );
  });
  return (
    <header>
      <h2>Menu</h2>
      <nav>
        <h1>
          Home <span>Grill</span>
        </h1>
        <ul>{tabs}</ul>
      </nav>
    </header>
  );
};

export default Header;
