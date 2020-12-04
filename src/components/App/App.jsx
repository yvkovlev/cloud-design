import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import Projects from '../../pages/Projects/Projects';
import SignUp from '../../pages/SignUp/SignUp';
import SignIn from '../../pages/SignIn/SignIn';

import styles from './App.module.scss';
import AddProject from "../../pages/AddProject/AddProject";

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
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/add-project">
          <AddProject />
        </Route>
      </Switch>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
};

export default App;
