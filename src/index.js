import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import QuestionsFake from './mocks/questions.js';
import SettingsFake from './mocks/settings.js';


const init = () => {
  ReactDOM.render(
      <App
        questions={QuestionsFake}
        gameTime={SettingsFake.gameTime}
        errorCount={SettingsFake.errorCount}
      />,
      document.querySelector(`#root`)
  );
};

init();
