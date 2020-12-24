import React, { useEffect } from 'react';
import dictionary from '@utils/dictionary';
import image_1_1 from '../../assets/images/instructions/program1/1_1.png';
import image_1_2 from '../../assets/images/instructions/program1/1_2.png';
import image_1_3 from '../../assets/images/instructions/program1/1_3.png';
import image_1_4 from '../../assets/images/instructions/program1/1_4.png';
import image_1_5 from '../../assets/images/instructions/program1/1_5.png';
import image_2_1 from '../../assets/images/instructions/program2/2_1.png';
import image_2_2 from '../../assets/images/instructions/program2/2_2.png';
import image_2_3 from '../../assets/images/instructions/program2/2_3.png';
import image_2_4 from '../../assets/images/instructions/program2/2_4.png';
import image_2_5 from '../../assets/images/instructions/program2/2_5.png';
import image_3_1 from '../../assets/images/instructions/program3/3_1.png';
import image_3_2 from '../../assets/images/instructions/program3/3_2.png';
import image_3_3 from '../../assets/images/instructions/program3/3_3.png';
import image_3_4 from '../../assets/images/instructions/program3/3_4.png';
import image_3_5 from '../../assets/images/instructions/program3/3_5.png';
import image_3_6 from '../../assets/images/instructions/program3/3_6.png';
import image_3_7 from '../../assets/images/instructions/program3/3_7.png';
import image_4_1 from '../../assets/images/instructions/program4/4_1.png';
import image_4_2 from '../../assets/images/instructions/program4/4_2.png';
import image_4_3 from '../../assets/images/instructions/program4/4_3.png';
import image_4_4 from '../../assets/images/instructions/program4/4_4.png';
import image_4_5 from '../../assets/images/instructions/program4/4_5.png';
import image_4_6 from '../../assets/images/instructions/program4/4_6.png';
import image_4_7 from '../../assets/images/instructions/program4/4_7.png';
import image_4_8 from '../../assets/images/instructions/program4/4_7.png';

const Instructions = () => {
  useEffect(() => {
    document.title = `Инструкции – ${dictionary.APP_NAME}`;
  }, []);

  return (
    <main className="main">
      <div className="container">
        <div className="row mb-3">
          <div className="col-12">
            <div className="d-flex justify-content-between">
              <h4 className="m-0">Инструкции</h4>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="program1-tab" data-toggle="tab" href="#program1" role="tab" aria-controls="program1" aria-selected="true">3Ds & Maya</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#program2" role="tab" aria-controls="program2" aria-selected="false">Cinema 4D</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#program3" role="tab" aria-controls="program3" aria-selected="false">Blender</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#program4" role="tab" aria-controls="program4" aria-selected="false">After Effects & Premier Pro</a>
                  </li>
                </ul>
                <div className="tab-content py-4" id="myTabContent">
                  <div className="tab-pane fade show active" id="program1" role="tabpanel" aria-labelledby="home-tab">
                    <h5>Инструкция для программ 3Ds & Maya</h5>
                    <ol>
                      <li className="mb-3">
                        <h6>Перейдите в меню “File”.</h6>
                        <img src={image_1_1} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Выберите пункт “Save Scene as ...”.</h6>
                        <img src={image_1_2} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Выберите папку для сохранения проекта. В примере проект сохраняется в папку Maya на диске C:\.</h6>
                        <img src={image_1_3} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Далее снова перейдите в “File” и выберите “Archive Scene”.</h6>
                        <img src={image_1_4} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Перейдите в папку, куда сохранили проект.</h6>
                        <img src={image_1_5} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Создайте новый проект на Cloud Design.</h6>
                      </li>
                      <li className="mb-3">
                        <h6>Загрузите архив проекта.</h6>
                      </li>
                      <li className="mb-3">
                        <h6>Отправьте проект на рендеринг.</h6>
                      </li>
                      <li>Готово!</li>
                    </ol>
                  </div>
                  <div className="tab-pane fade" id="program2" role="tabpanel" aria-labelledby="profile-tab">
                    <h5>Инструкция для программы Cinema 4d</h5>
                    <ol>
                      <li className="mb-3">
                        <h6>Перейдите в меню “File”.</h6>
                        <img src={image_2_1} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Выберите “Save Project with Assets...”.</h6>
                        <img src={image_2_2} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Выберите путь для сохранения проекта. В примере проект сохраняется в папку Cinema 4D на диске C:\.</h6>
                        <img src={image_2_3} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Перейдите в папку, куда был сохранен проект.</h6>
                        <img src={image_2_4} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Создайте из неё архив: правая кнопка мыши по папке - “Добавить в [имя файла].rar”.</h6>
                        <img src={image_2_5} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Создайте новый проект на Cloud Design.</h6>
                      </li>
                      <li className="mb-3">
                        <h6>Загрузите архив проекта.</h6>
                      </li>
                      <li className="mb-3">
                        <h6>Отправьте проект на рендеринг.</h6>
                      </li>
                      <li>Готово!</li>
                    </ol>
                  </div>
                  <div className="tab-pane fade" id="program3" role="tabpanel" aria-labelledby="contact-tab">
                    <h5>Инструкция для программы Blender</h5>
                    <ol>
                      <li className="mb-3">
                        <h6>Перейдите в меню “File”.</h6>
                        <img src={image_3_1} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Выберите пункт “Save”.</h6>
                        <img src={image_3_2} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Выберите папку для сохранения проекта. В примере проект сохраняется в папку Blender на диске C:\.</h6>
                        <img src={image_3_3} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Вернитесь в меню “File” и наведите курсор на пункт “External Data”.</h6>
                        <img src={image_3_4} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Выберите “Pack All Into .blend”.</h6>
                        <img src={image_3_5} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Перейдите в папку с сохраненным файлом.</h6>
                        <img src={image_3_6} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Создайте с ним архив: правая кнопка мыши по папке - “Добавить в [имя файла].rar”.</h6>
                        <img src={image_3_7} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Создайте новый проект на Cloud Design.</h6>
                      </li>
                      <li className="mb-3">
                        <h6>Загрузите архив проекта.</h6>
                      </li>
                      <li className="mb-3">
                        <h6>Отправьте проект на рендеринг.</h6>
                      </li>
                      <li>Готово!</li>
                    </ol>
                  </div>
                  <div className="tab-pane fade" id="program4" role="tabpanel" aria-labelledby="contact-tab">
                    <h5>Инструкция для программ After Effects & Premier Pro</h5>
                    <ol>
                      <li className="mb-3">
                        <h6>Перейдите в меню “File”.</h6>
                        <img src={image_4_1} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Выберите пункт “Project Manager” / “Диспетчер проектов”.</h6>
                        <img src={image_4_2} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Установите флажки перед всеми эпизодами в окне “Sequence” / “Эпизод”.</h6>
                        <img src={image_4_3} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Ниже окна “Эпизод” выберите пункт “Собрать файлы и скопировать в новое место” / “Collect Files and Copy to New Location”.</h6>
                        <img src={image_4_4} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Ниже выберите папку, куда будет сохранён проект. В примере проект сохраняется в папку Premier Pro на диске C:\.</h6>
                        <img src={image_4_5} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Нажмите “ОК” внизу окна Project Manager.</h6>
                        <img src={image_4_6} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Перейдите в папку с сохранённым проектом. Нас интересует папка “Скопировано_[имя проекта]”.</h6>
                        <img src={image_4_7} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Создайте с ней архив: правая кнопка мыши по папке - “Добавить в [имя файла].rar”.</h6>
                        <img src={image_4_8} className="w-75" />
                      </li>
                      <li className="mb-3">
                        <h6>Создайте новый проект на Cloud Design.</h6>
                      </li>
                      <li className="mb-3">
                        <h6>Загрузите архив проекта.</h6>
                      </li>
                      <li className="mb-3">
                        <h6>Отправьте проект на рендеринг.</h6>
                      </li>
                      <li>Готово!</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Instructions;
