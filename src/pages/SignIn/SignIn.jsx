import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import fetchData from '@utils/fetch';
import dictionary from '@utils/dictionary';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email не заполнен';
  }

  if (!values.password) {
    errors.password = 'Пароль не заполнен';
  }

  return errors;
};

const SignIn = () => {
  useEffect(() => {
    document.title = `Вход – ${dictionary.APP_NAME}`;
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await fetchData('/api/sign-in', 'POST', values);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <main className="main">
      <div className="container">
        <div className="row d-flex flex-column align-items-center">
          <div className="col-md-5">
            <div className="d-flex align-items-end justify-content-between mb-3">
              <h3 className="m-0">Вход</h3>
              <span>
                Нет аккаунта?&nbsp;
                <Link to="/sign-up">Регистрация</Link>
              </span>
            </div>
            <div className="card">
              <div className="card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? <small className="text-danger">{formik.errors.email}</small> : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? <small className="text-danger">{formik.errors.password}</small> : null}
                  </div>
                  <button type="submit" className="btn btn-primary btn-block" disabled={formik.isSubmitting}>Войти</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
