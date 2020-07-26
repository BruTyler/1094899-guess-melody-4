import React from 'react';
import renderer from 'react-test-renderer';
import withAudio from './with-audio';

const MockComponent = (props) => {
  // eslint-disable-next-line react/prop-types
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

// MockComponent.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node
//   ]).isRequired,
// };

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
