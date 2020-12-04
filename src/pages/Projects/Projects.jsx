import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

import dictionary from '@utils/dictionary';
import { getProjectStatus } from '@utils/functions';

import { getProjectsData } from '../../store/action-creator';

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);

  useEffect(() => {
    (async () => {
      if (isEmpty(projects)) {
        await dispatch(getProjectsData());
      }
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
          <div className="col-sm-3">
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Проекты выполненные
                <span className="badge badge-success badge-pill">2</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Проекты в обработке
                <span className="badge badge-warning badge-pill">1</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Проекты с ошибкой
                <span className="badge badge-danger badge-pill">1</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Всего проектов
                <span className="badge badge-light badge-pill">{ !isEmpty(projects) ? projects.length : 0 }</span>
              </li>
            </ul>
          </div>
          <div className="col-sm-9">
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
                        <th scope="col">Статус</th>
                        <th scope="col">Результат</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        !isEmpty(projects) && projects.map((item) => (
                          <tr key={item.status_id}>
                            <td>{ item.project_id }</td>
                            <td>{ item.project_name }</td>
                            <td>{ item.program }</td>
                            <td>{ item.plugin }</td>
                            <td>{ item.render_utility }</td>
                            <td>{ item.output_format }</td>
                            <td>{ `${item.output_width}x${item.output_height}` }</td>
                            <td>
                              <span className={`badge badge-pill badge-${getProjectStatus(item.status_id).style}`}>{ getProjectStatus(item.status_id).name }</span>
                            </td>
                            <td>
                              {
                                item.link_to_archive && (<a href={item.link_to_archive} download>Скачать</a>)
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
