import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import fetchData from '@utils/fetch';
import dictionary from '@utils/dictionary';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Имя не заполнено';
  }

  if (!values.password) {
    errors.password = 'Пароль не установлен';
  } else if (values.password.length < 5) {
    errors.password = 'Пароль должен быть больше 5 символов';
  }

  if (!values.email) {
    errors.email = 'Email не заполнен';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Некорректный e-mail';
  }

  if (!values.isPolicyAccepted) {
    errors.isPolicyAccepted = 'Требуется Ваше согласие с политикой конфиденциальности';
  }

  return errors;
};

const SignUp = () => {
  useEffect(() => {
    document.title = `Регистрация – ${dictionary.APP_NAME}`;
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      isPolicyAccepted: '',
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetchData('/api/sign-up', 'POST', values);
        if (response.code === 200) {
          toast.success('Пользователь успешно зарегистрирован!');
          resetForm();
        }
      } catch (error) {
        if (error.response.status === 422) {
          toast.error('Такой пользователь уже существует!');
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
              <h3 className="m-0">Регистрация</h3>
              <span>
                Уже есть аккаунт?&nbsp;
                <Link to="/sign-in">Войти</Link>
              </span>
            </div>
            <div className="card">
              <div className="card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">
                      Как Вас зовут?&nbsp;
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? <small className="text-danger">{formik.errors.name}</small> : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      Ваш email:&nbsp;
                      <span className="text-danger">*</span>
                    </label>
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
                    <label htmlFor="password">
                      Придумайте пароль:&nbsp;
                      <span className="text-danger">*</span>
                    </label>
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
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isPolicyAccepted"
                      name="isPolicyAccepted"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.isPolicyAccepted}
                    />
                    <label className="form-check-label" htmlFor="isPolicyAccepted">Согласен с политикой конфиденциальности</label>
                    <br />
                    {formik.touched.isPolicyAccepted && formik.errors.isPolicyAccepted ? <small className="text-danger">{formik.errors.isPolicyAccepted}</small> : null}
                  </div>
                  <button type="submit" className="btn btn-primary btn-block" disabled={formik.isSubmitting}>Готово</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
