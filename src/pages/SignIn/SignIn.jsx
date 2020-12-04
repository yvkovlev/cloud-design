import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';

import fetchData from '@utils/fetch';
import dictionary from '@utils/dictionary';

import { updateIsAuthorizedData} from '../../store/action-creator';

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
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.isAuthorized);
  let history = useHistory();

  useEffect(() => {
    document.title = `Вход – ${dictionary.APP_NAME}`;
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      history.push('/');
    }
  }, [isAuthorized]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetchData('/api/sign-in', 'POST', values);
        if (response.code === 200) {
          dispatch(updateIsAuthorizedData(true));
          resetForm();
        }
      } catch (error) {
        if (error.response.status === 422) {
          toast.error('Некорректные email или пароль.');
        } else {
          toast.error(`Ошибка сервера: ${error.response.status}`);
        }
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
