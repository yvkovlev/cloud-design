import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import dictionary from "@utils/dictionary";

import { getDateData } from '../../store/action-creator';

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
          <div className="col-12">
            <h1>Hello world!</h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Projects;
