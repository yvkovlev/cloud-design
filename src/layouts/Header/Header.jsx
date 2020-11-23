import * as React from 'react';
import styles from './Header.module.scss';
import {Link} from "react-router-dom";

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
