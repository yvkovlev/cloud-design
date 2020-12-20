import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.scss';
import { useAuth } from '../../hooks/use-auth';
import { getBalanceData, setIsBalanceChangedData } from '../../store/action-creator';

const Header = () => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance);
  const isBalanceChanged = useSelector((state) => state.isBalanceChanged);
  const auth = useAuth();

  const {
    header,
  } = styles;

  useEffect(() => {
    (async () => {
      if (!balance || isBalanceChanged) {
        await dispatch(getBalanceData(auth.user));
        dispatch(setIsBalanceChangedData(false));
      }
    })();
  }, []);

  return (
    <header className={header}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Cloud Design</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarToggler">
          {
            auth.user ? (
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Мои проекты</Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Главная</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Тарифы</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">FAQ</Link>
                </li>
              </ul>
            )
          }
          {
            auth.user ? (
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/balance">
                    <span className="text-warning">
                      <FontAwesomeIcon icon={faCoins} />
                    </span>
                    <span className="ml-2 text-white">{ `${balance ? balance.hours : '0'} HRS` }</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Поддержка</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">FAQ</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => auth.signOut()}>Выход</a>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-up">Регистрация</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-in">Вход</Link>
                </li>
              </ul>
            )
          }
        </div>
      </nav>
    </header>
  );
};

export default Header;
