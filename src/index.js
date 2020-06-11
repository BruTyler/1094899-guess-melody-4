import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const Settings = {
  GAMETIME: 5,
  ERRORCOUNT: 3
};

const init = () => {
  ReactDOM.render(
      <App
        gameTime={Settings.GAMETIME}
        errorCount={Settings.ERRORCOUNT}
      />,
      document.querySelector(`#root`)
  );
};

init();
