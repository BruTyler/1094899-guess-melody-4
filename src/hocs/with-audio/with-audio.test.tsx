import * as React from 'react';
import * as renderer from 'react-test-renderer';
import withAudio from './with-audio';

interface Props {
  children: React.ReactNode;
}

const MockComponent: React.FunctionComponent<Props> = (props: Props) => (
  <div>{props.children}</div>
);

const MockComponentWrapped = withAudio(MockComponent);

describe(`withAudio render suit`, () => {
  it(`withAudio render case`, () => {
    const generatedTree = renderer.create(
        <MockComponentWrapped
          src={``}
          isPlaying={false}
          onPlayButtonClick={() => null}
        />,
        {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
