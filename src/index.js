import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import App from './components/app/app.jsx';
import QuestionsFake from './mocks/questions.js';
import SettingsFake from './mocks/settings.js';
import {reducer} from './reducer.js';

const store = createStore(reducer);

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App
          questions={QuestionsFake}
          gameTime={SettingsFake.gameTime}
          errorCount={SettingsFake.errorCount}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
