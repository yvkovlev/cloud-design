import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import Projects from '../../pages/Projects/Projects';
import SignUp from '../../pages/SignUp/SignUp';

import styles from './App.module.scss';

const App = () => {
  const { wrapper } = styles;
  return (
    <Router>
      <div className={wrapper}>
        <Header />
      </div>
      <Switch>
        <Route exact path="/">
          <Projects />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
