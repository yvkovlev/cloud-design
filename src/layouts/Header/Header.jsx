import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  const {
    header,
  } = styles;

  return (
    <header className={header}>
      <Link to="/">Home</Link>
      <Link to="/sign-up">Sign-Up</Link>
    </header>
  );
};

export default Header;
