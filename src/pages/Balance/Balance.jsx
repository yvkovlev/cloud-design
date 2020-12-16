import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import dictionary from '@utils/dictionary';
import { getProjectStatus } from '@utils/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faLock } from '@fortawesome/free-solid-svg-icons';
import { getProjectsData } from '../../store/action-creator';
import { useAuth } from '../../hooks/use-auth';

const Balance = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const auth = useAuth();

  useEffect(() => {
    (async () => {
      await dispatch(getProjectsData(auth.user));
    })();
  }, []);

  useEffect(() => {
    document.title = `Баланс – ${dictionary.APP_NAME}`;
  }, []);

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
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="font-weight-bold text-primary">12 HRS</h2>
                <p className="m-0">Текущий баланс рендер-часов</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="font-weight-bold text-secondary">117 HRS</h2>
                <p className="m-0">Израсходовано рендер-часов</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 bg-primary text-light">
              <div className="card-body">
                <button type="button" className="btn btn-light mb-3">
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
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Название</th>
                        <th scope="col">Программа</th>
                        <th scope="col">Плагин</th>
                        <th scope="col">Рендер-движок</th>
                        <th scope="col">Формат</th>
                        <th scope="col">Разрешение</th>
                        <th scope="col">Стоимость</th>
                        <th scope="col">Статус</th>
                        <th scope="col">Результат</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        !isEmpty(projects) && projects.map((item) => (
                          <tr key={item._id || 0}>
                            <td>{ item._id || '-' }</td>
                            <td>{ item.project_name || '-' }</td>
                            <td>{ item.program || '-' }</td>
                            <td>{ item.plugin || '-' }</td>
                            <td>{ item.render_utility || '-' }</td>
                            <td>{ item.output_format || '-' }</td>
                            <td>{ `${item.output_width || '-'}x${item.output_height || '-'}` }</td>
                            <td>{ `${item.cost || '1'} HRS` }</td>
                            <td>
                              <span className={`badge badge-pill badge-${getProjectStatus(item.status_id).style || 'light'}`}>{ getProjectStatus(item.status_id).name || '-' }</span>
                            </td>
                            <td>
                              {
                                item.link_to_archive && (
                                  <a href={item.link_to_archive} download>Скачать</a>
                                )
                              }
                            </td>
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
    </main>
  );
};

export default Balance;
