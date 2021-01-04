import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { ProvideAuth } from '../../hooks/use-auth';

import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import Projects from '../../pages/Projects/Projects';
import AddProject from '../../pages/AddProject/AddProject';
import SignUp from '../../pages/SignUp/SignUp';
import SignIn from '../../pages/SignIn/SignIn';
import Balance from '../../pages/Balance/Balance';
import Instructions from '../../pages/Instructions/Instructions';

import PrivateRoute from '../PrivateRoute/PrivateRoute';

import styles from './App.module.scss';

const App = () => {
  const { wrapper } = styles;
  return (
    <ProvideAuth>
      <Router>
        <div className={wrapper}>
          <Header />
        </div>
        <Switch>
          <Route exact path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <PrivateRoute path="/instructions">
            <Instructions />
          </PrivateRoute>
          <PrivateRoute path="/balance">
            <Balance />
          </PrivateRoute>
          <PrivateRoute path="/add-project">
            <AddProject />
          </PrivateRoute>
          <PrivateRoute path="/">
            <Projects />
          </PrivateRoute>
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
    </ProvideAuth>
  );
};

export default App;
