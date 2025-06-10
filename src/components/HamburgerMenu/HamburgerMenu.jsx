import React from 'react';
import './HamburgerMenu.css';

export default function HamburgerMenu({ onOpen }) {
  return (
    <div className="hamburger-menu" onClick={onOpen}>
      <div className="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
