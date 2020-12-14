import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

import dictionary from '@utils/dictionary';
import { getProjectStatus } from '@utils/functions';

import { getProjectsData } from '../../store/action-creator';
import { useAuth } from '../../hooks/use-auth';

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const auth = useAuth();

  useEffect(() => {
    (async () => {
      await dispatch(getProjectsData(auth.user));
    })();
  }, []);

  useEffect(() => {
    document.title = `Проекты – ${dictionary.APP_NAME}`;
  }, []);

  return (
    <main className="main">
      <div className="container">
        <div className="row mb-3">
          <div className="col-12">
            <div className="d-flex justify-content-between">
              <h4 className="m-0">Проекты</h4>
              <Link to="/add-project" className="btn btn-outline-primary">Новый проект</Link>
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

export default Projects;
