import React, { useEffect } from 'react';
import dictionary from "@utils/dictionary";

const SignUp = () => {
  useEffect(() => {
    document.title = 'Регистрация – ' + dictionary.APP_NAME;
  }, []);

  return (
    <main className="main">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Sign Upd</h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
