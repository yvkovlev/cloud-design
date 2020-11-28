import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import dictionary from '@utils/dictionary';

import { getDateData } from '../../store/action-creator';

const projects = [
  {
    project_id: 0,
    project_name: '',
    link_to_archive: '',
    program: '',
    fonts: [],
    frame_start: '',
    frame_end: '',
    output_format: '',
    output_width: '',
    output_height: '',
    comment: '',
    start_date: '',
    end_date: '',
    status_id: 0,
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
                <div className="table-responsive-md">
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
                      <tr>
                      <td>3</td>
                      <td>Интерьер спальни</td>
                      <td>3Ds Max</td>
                      <td>JPG</td>
                      <td>1920x1080</td>
                      <td>
                        <span className="badge badge-pill badge-danger">Ошибка обработки</span>
                      </td>
                      <td>

                      </td>
                    </tr>
                      <tr>
                        <td>2</td>
                        <td>Интерьер гостинной</td>
                        <td>3Ds Max</td>
                        <td>JPG</td>
                        <td>1920x1080</td>
                        <td>
                          <span className="badge badge-pill badge-warning">В процессе</span>
                        </td>
                        <td>

                        </td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Интерьер кухни</td>
                        <td>3Ds Max</td>
                        <td>JPG</td>
                        <td>1920x1080</td>
                        <td>
                          <span className="badge badge-pill badge-success">Готово</span>
                        </td>
                        <td>
                          <a href="#" download>Скачать</a>
                        </td>
                      </tr>
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
