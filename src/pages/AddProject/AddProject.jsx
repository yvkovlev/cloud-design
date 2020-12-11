import React, { useEffect, useState } from 'react';

import dictionary from '@utils/dictionary';
import { Link } from 'react-router-dom';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import fetchData from '@utils/fetch';
import { toast } from 'react-toastify';
import {useAuth} from "../../hooks/use-auth";

const validate = (values) => {
  const errors = {};

  if (!values.project_name) {
    errors.project_name = 'Название проекта не заполнено';
  }

  if (!values.program) {
    errors.program = 'Программа не выбрана';
  }

  if (!values.plugin) {
    errors.plugin = 'Плагин не выбран';
  }

  if (!values.render_utility) {
    errors.render_utility = 'Рендер-движок не выбран';
  }

  if (!values.output_format) {
    errors.output_format = 'Не выбран формат выходного файла';
  }

  if (!values.output_width) {
    errors.output_width = 'Не заполнена ширина выходного файла';
  }

  if (!values.output_height) {
    errors.output_height = 'Не заполнена высота выходного файла';
  }

  if (!values.archive) {
    errors.archive = 'Не выбран архив проекта';
  } else if (values.archive.type !== 'application/zip') {
    errors.archive = 'Необходимо выбрать архив с расширением .zip';
  }

  return errors;
};

const AddProject = () => {
  const auth = useAuth();
  const [dragNDropText, setDragNDropText] = useState('');

  useEffect(() => {
    document.title = `Проекты – ${dictionary.APP_NAME}`;
  }, []);

  const formik = useFormik({
    initialValues: {
      archive: null,
      project_name: '',
      program: null,
      plugin: null,
      render_utility: null,
      fonts: [],
      frames: '',
      output_format: null,
      output_width: '',
      output_height: '',
      comment: '',
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      let data = new FormData();

      data.append('archive', values.archive);
      data.append('project_name', values.project_name);
      data.append('program', values.program);
      data.append('plugin', values.plugin);
      data.append('render_utility', values.render_utility);
      data.append('fonts', values.fonts);
      data.append('frames', values.frames);
      data.append('output_format', values.output_format);
      data.append('output_width', values.output_width);
      data.append('output_height', values.output_height);
      data.append('comment', values.comment);
      data.append('email', auth.user);

      try {
        const response = await fetchData('/api/projects', 'POST', data);
        if (response.code === 200) {
          resetForm();
          toast.success('Проект успешно добавлен!');
        }
      } catch (error) {
        if (error.response.status === 422) {
          toast.error('Недостаточно баланса часов. Пожалуйста, пополните счёт.');
        } else {
          toast.error(`Ошибка сервера: ${error.response.status}`);
        }
      }
    },
  });

  useEffect(() => {
    if (formik.values.archive) {
      setDragNDropText(`Выбран файл: ${formik.values.archive.name}`);
    } else {
      setDragNDropText('Перетащите архив не более 10 Гб или загрузите файл с компьютера');
    }
  }, [formik.values.archive]);

  return (
    <main className="main">
      <div className="container">
        <div className="row mb-3">
          <div className="col-12">
            <div className="d-flex justify-content-between">
              <h4 className="m-0">Новый проект</h4>
              <Link to="/" className="btn btn btn-link">Мои проекты</Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-5">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="mb-3">Загрузка архива проекта</h5>
                <form>
                  <div className="form-group">
                    <label htmlFor="archive" className="form-label">Архив проекта:</label>
                    <div className="drag-n-drop">
                      <input
                        type="file"
                        className="form-control"
                        id="archive"
                        name="archive"
                        onChange={(event) => {
                          formik.setFieldValue('archive', event.currentTarget.files[0]);
                        }}
                        onBlur={formik.handleBlur}
                      />
                      <div className="drag-n-drop-zone">
                        <div className="text-primary">
                          <FontAwesomeIcon icon={faCloudUploadAlt} />
                        </div>
                        <div>
                          {dragNDropText}
                        </div>
                      </div>
                      {formik.touched.archive && formik.errors.archive ? <small className="text-danger">{formik.errors.archive}</small> : null}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h6>Инструкция</h6>
                <ol>
                  <li>Загрузите архив проекта в формате <code>.zip</code>.</li>
                  <li>Уточните параметры рендера.</li>
                  <li>Уточните параметры выходного файла.</li>
                  <li>Нажмите на кнопку <code>Начать рендеринг</code>.</li>
                  <li>Ожидайте выполнение операции на странице проектов.</li>
                </ol>
              </div>
            </div>
          </div>
          <div className="col-sm-7">
            <div className="card">
              <div className="card-body">
                <h5 className="mb-3">Настройка параметров рендера</h5>
                <form onSubmit={() => false}>
                  <div className="form-group row">
                    <label htmlFor="project_name" className="col-sm-4 col-form-label">Название проекта:</label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Например, Интерьер гостинной"
                        id="project_name"
                        name="project_name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.project_name}
                      />
                      {formik.touched.project_name && formik.errors.project_name ? <small className="text-danger">{formik.errors.project_name}</small> : null}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="program" className="col-sm-4 col-form-label">Программа:</label>
                    <div className="col-sm-8">
                      <select
                        className="form-control"
                        id="program"
                        name="program"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.program}
                      >
                        <option disabled selected>Выбрать программу...</option>
                        <option value="0">3Ds Max</option>
                        <option value="1">Cinema 4D</option>
                        <option value="2">Blender</option>
                        <option value="3">After Effects</option>
                        <option value="4">Maya</option>
                        <option value="5">Houdini</option>
                      </select>
                      {formik.touched.program && formik.errors.program ? <small className="text-danger">{formik.errors.program}</small> : null}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="plugin" className="col-sm-4 col-form-label">Плагин:</label>
                    <div className="col-sm-8">
                      <select
                        className="form-control"
                        id="plugin"
                        name="plugin"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.plugin}
                      >
                        <option disabled selected>Выбрать плагин...</option>
                        <option value="0">Без плагина</option>
                        <option value="1">Realflow</option>
                        <option value="2">SigerNoise</option>
                      </select>
                      {formik.touched.plugin && formik.errors.plugin ? <small className="text-danger">{formik.errors.plugin}</small> : null}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="render_utility" className="col-sm-4 col-form-label">Рендер-движок:</label>
                    <div className="col-sm-8">
                      <select
                        className="form-control"
                        id="render_utility"
                        name="render_utility"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.render_utility}
                      >
                        <option disabled selected>Выбрать рендер-движок...</option>
                        <option value="0">V-ray</option>
                        <option value="1">Corona</option>
                        <option value="2">Arnold</option>
                      </select>
                      {formik.touched.render_utility && formik.errors.render_utility ? <small className="text-danger">{formik.errors.render_utility}</small> : null}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="fonts" className="col-sm-4 col-form-label">Шрифты:</label>
                    <div className="col-sm-8">
                      <select
                        multiple
                        className="form-control"
                        id="fonts"
                        name="fonts"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fonts}
                      >
                        <option disabled selected>Выбрать шрифты...</option>
                        <option value="0">Arial</option>
                        <option value="1">PT Sans</option>
                        <option value="2">Times New Roman</option>
                      </select>
                    </div>
                  </div>
                </form>
                <hr />
                <h5 className="mb-3">Настройка выходных параметров</h5>
                <form>
                  <div className="form-group row">
                    <label htmlFor="output_format" className="col-sm-4 col-form-label">Выходной формат:</label>
                    <div className="col-sm-8">
                      <select
                        className="form-control"
                        id="output_format"
                        name="output_format"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.output_format}
                      >
                        <option disabled selected>Выбрать формат...</option>
                        <option value="0">JPG</option>
                        <option value="1">PNG</option>
                        <option value="2">MP4</option>
                      </select>
                      {formik.touched.output_format && formik.errors.output_format ? <small className="text-danger">{formik.errors.output_format}</small> : null}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="frames" className="col-sm-4 col-form-label">Диапазон кадров:</label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Например, 0-10,12,15"
                        id="frames"
                        name="frames"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.frames}
                      />
                      {formik.touched.frames && formik.errors.frames ? <small className="text-danger">{formik.errors.frames}</small> : null}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <label htmlFor="output_width">Ширина выходного файла:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="1920"
                        id="output_width"
                        name="output_width"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.output_width}
                      />
                      {formik.touched.output_width && formik.errors.output_width ? <small className="text-danger">{formik.errors.output_width}</small> : null}
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="output_height">Высота выходного файла:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="1080"
                        id="output_height"
                        name="output_height"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.output_height}
                      />
                      {formik.touched.output_height && formik.errors.output_height ? <small className="text-danger">{formik.errors.output_height}</small> : null}
                    </div>
                  </div>
                </form>
                <hr />
                <form>
                  <div className="form-group row">
                    <label htmlFor="comment" className="col-sm-4 col-form-label">Комментарий:</label>
                    <div className="col-sm-8">
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Комментарий к проекту..."
                        id="comment"
                        name="comment"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.comment}
                      />
                    </div>
                  </div>
                </form>
                <hr />
                <button type="button" className="btn btn-success" onClick={formik.handleSubmit}>Начать рендеринг</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddProject;
