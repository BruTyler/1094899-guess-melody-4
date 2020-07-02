import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import withAudio from './with-audio.jsx';

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapped = withAudio(MockComponent);

describe(`withAudio render suit`, () => {
  it(`withAudio render case`, () => {
    const generatedTree = renderer.create(
        <MockComponentWrapped
          src={``}
          isPlaying={false}
          onPlayButtonClick={() => {}}
        />,
        {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
