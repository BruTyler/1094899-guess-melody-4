import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import WelcomeScreen from './../welcome-screen/welcome-screen.jsx';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen.jsx';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen.jsx';

const welcomeButtonHandler = () => {};

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {gameTime, errorCount, questions} = this.props;

    return <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <WelcomeScreen
            time={gameTime}
            error={errorCount}
            onWelcomeButtonClick={welcomeButtonHandler}/>
        </Route>
        <Route exact path="/dev-artist">
          <QuestionArtistScreen
            question={questions[0]}/>
        </Route>
        <Route exact path="/dev-genre">
          <QuestionGenreScreen
            question={questions[0]} />
        </Route>
      </Switch>
    </BrowserRouter>;
  }
}


App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        genre: PropTypes.string,
        song: PropTypes.shape({
          artist: PropTypes.string.isRequired,
          src: PropTypes.string.isRequired,
        }),
        answers: PropTypes.arrayOf(
            PropTypes.shape({
              picture: PropTypes.string,
              artist: PropTypes.string,
              src: PropTypes.string,
              genre: PropTypes.string,
            })
        ).isRequired
      })
  ).isRequired,
};

export default App;
