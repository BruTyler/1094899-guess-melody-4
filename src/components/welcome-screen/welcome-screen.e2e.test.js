import React from 'react';
import {shallow} from 'enzyme';
import WelcomeScreen from './welcome-screen';

describe(`WelcomeScreen suite`, () => {
  it(`WelcomeScreen button is pressed`, () => {
    const onWelcomeButtonHandler = jest.fn();

    const welcomeScreen = shallow(
        <WelcomeScreen
          error={5}
          time={3}
          onWelcomeButtonClick={onWelcomeButtonHandler}
        />
    );

    const welcomeButton = welcomeScreen.find(`button.welcome__button`);
    welcomeButton.simulate(`click`, {preventDefault() {}});

    expect(onWelcomeButtonHandler.mock.calls.length).toBe(1);
  });
});
