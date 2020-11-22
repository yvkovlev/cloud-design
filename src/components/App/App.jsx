import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import Projects from '../../pages/Projects/Projects';

import styles from './App.module.scss';


const App = () => {
  const { wrapper } = styles;
  return (
    <Router>
      <div className={wrapper}>
        <Header />
      </div>
      <Switch>
        <Route path="/">
          <Projects />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
