import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dictionary from '@utils/dictionary';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faLock } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import fetchData from '@utils/fetch';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import { useAuth } from '../../hooks/use-auth';
import {
  getTransactionsData,
  setIsBalanceChangedData,
} from '../../store/action-creator';

const validate = (values) => {
  const errors = {};

  if (!values.hours) {
    errors.hours = 'Не указано количество часов для пополнения.';
  }

  return errors;
};

const getFormatedDate = (timestamp) => {
  const parcedDate = Date.parse(timestamp);
  const date = new Date(parcedDate);
  return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
};

const Balance = () => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance);
  const isBalanceChanged = useSelector((state) => state.isBalanceChanged);
  const transactionHistory = useSelector((state) => state.transactionHistory);
  const auth = useAuth();
  const closeModalBtn = useRef();

  useEffect(() => {
    document.title = `Баланс – ${dictionary.APP_NAME}`;
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch(getTransactionsData());
    })();
  }, [isBalanceChanged]);

  const formik = useFormik({
    initialValues: {
      hours: null,
      cost: null,
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      const data = {
        ...values,
      };

      try {
        const response = await fetchData('/api/balance', 'POST', data);
        if (response.code === 200) {
          resetForm();
          toast.success('Баланс успешно пополнен!');
          dispatch(setIsBalanceChangedData(true));
          closeModalBtn.current.click();
        }
      } catch (error) {
        toast.error(`Ошибка сервера: ${error.response.status}`);
      }
    },
  });

  useEffect(() => {
    if (formik.values.hours < 0) {
      formik.values.hours = 0;
      formik.values.cost = 0;
    } else {
      formik.values.cost = formik.values.hours * 100;
    }
  }, [formik.values.hours]);

  return (
    <main className="main">
      <div className="container">
        <div className="row mb-3">
          <div className="col-12">
            <div className="d-flex justify-content-between">
              <h4 className="m-0">Баланс</h4>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="font-weight-bold text-primary">{ `${balance ? balance.hours : '0'} HRS` }</h2>
                <p className="m-0">Текущий баланс рендер-часов</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 bg-primary text-light">
              <div className="card-body">
                <button type="button" className="btn btn-light mb-3" data-toggle="modal" data-target="#addBalanceModal">
                  <span className="text-primary mr-2">
                    <FontAwesomeIcon icon={faCoins} />
                  </span>
                  Пополнить
                </button>
                <p className="m-0">
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  Платежи защищены шифрованием
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h6 className="mb-3">История пополнений</h6>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">№</th>
                        <th scope="col">Дата пополнения</th>
                        <th scope="col">Сумма пополнения, HRS</th>
                        <th scope="col">Стоимость пополнения, RUB</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        !isEmpty(transactionHistory) && transactionHistory.map((item, index) => (
                          <tr key={item._id || 0}>
                            <td>{ index + 1 }</td>
                            <td>{ getFormatedDate(item.date) || '-' }</td>
                            <td>{ item.value_hours || '-' }</td>
                            <td>{ item.value_rubbles || '-' }</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="addBalanceModal" tabIndex="-1" role="dialog" aria-labelledby="addBalanceModal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Пополнение баланса</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" ref={closeModalBtn}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="hours">Пополнить на:</label>
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Количество часов..."
                      id="hours"
                      name="hours"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.hours}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">HRS</span>
                    </div>
                  </div>
                  {formik.touched.hours && formik.errors.hours ? <small className="text-danger">{formik.errors.hours}</small> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="cost">Стоимость пополнения:</label>
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Стоимость пополнения..."
                      id="cost"
                      name="cost"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cost}
                      disabled
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">RUB</span>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={formik.isSubmitting}>Пополнить</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Balance;
