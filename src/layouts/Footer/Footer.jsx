import * as React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  const {
    footer,
  } = styles;
  return (
    <footer className={footer}>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <small className="text-muted">Cloud Design © 2021. Все права защищены.</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
