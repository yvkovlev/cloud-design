import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import dictionary from '@utils/dictionary';
import { getProjectStatus } from '@utils/functions';

import { getDateData } from '../../store/action-creator';

const projects = [
  {
    project_id: 4,
    project_name: 'Интерьер ванной',
    link_to_archive: '#',
    program: '3Ds Max',
    fonts: ['PT Sans', 'Open Sans'],
    frame_start: '00:00:00',
    frame_end: '00:01:00',
    output_format: 'JPG',
    output_width: '1920',
    output_height: '1080',
    comment: 'Комментарий к проекту',
    start_date: new Date(),
    end_date: new Date(),
    status_id: 2,
  },
  {
    project_id: 3,
    project_name: 'Интерьер спальни',
    link_to_archive: null,
    program: '3Ds Max',
    fonts: ['PT Sans', 'Open Sans'],
    frame_start: '00:00:00',
    frame_end: '00:01:00',
    output_format: 'JPG',
    output_width: '1920',
    output_height: '1080',
    comment: 'Комментарий к проекту',
    start_date: new Date(),
    end_date: new Date(),
    status_id: 3,
  },
  {
    project_id: 2,
    project_name: 'Интерьер спальни',
    link_to_archive: '#',
    program: '3Ds Max',
    fonts: ['PT Sans', 'Open Sans'],
    frame_start: '00:00:00',
    frame_end: '00:01:00',
    output_format: 'JPG',
    output_width: '1920',
    output_height: '1080',
    comment: 'Комментарий к проекту',
    start_date: new Date(),
    end_date: new Date(),
    status_id: 2,
  },
  {
    project_id: 1,
    project_name: 'Интерьер кухни',
    link_to_archive: '#',
    program: '3Ds Max',
    fonts: ['PT Sans', 'Open Sans'],
    frame_start: '00:00:00',
    frame_end: '00:01:00',
    output_format: 'JPG',
    output_width: '1920',
    output_height: '1080',
    comment: 'Комментарий к проекту',
    start_date: new Date(),
    end_date: new Date(),
    status_id: 1,
  },
];

const Projects = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.date);

  useEffect(() => {
    (async () => {
      if (!date) {
        await dispatch(getDateData());
      }
    })();
  }, []);

  useEffect(() => {
    document.title = dictionary.APP_NAME;
  }, []);

  return (
    <main className="main">
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link" href="#">Active</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Disabled</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-9">
            <div className="d-flex justify-content-between mb-3">
              <h4 className="m-0">Проекты</h4>
              <button className="btn btn-sm btn-outline-primary">Новый проект</button>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Название</th>
                        <th scope="col">Программа</th>
                        <th scope="col">Формат</th>
                        <th scope="col">Разрешение</th>
                        <th scope="col">Статус</th>
                        <th scope="col">Результат</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        projects.map((item) => (
                          <tr key={item.status_id}>
                            <td>{ item.project_id }</td>
                            <td>{ item.project_name }</td>
                            <td>{ item.program }</td>
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
