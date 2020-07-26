import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withUserAnswer = (Component) => {
  class WithUserAnswer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        userAnswers: new Array(4).fill(false),
      };

      this.handleAnswerChange = this.handleAnswerChange.bind(this);
      this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
    }

    handleAnswerSubmit() {
      const {onAnswer, question} = this.props;
      const {userAnswers} = this.state;
      onAnswer(question, userAnswers);
    }

    handleAnswerChange(index, value) {
      const userAnswers = this.state.userAnswers.slice(0);
      userAnswers[index] = value;
      this.setState({
        userAnswers
      });
    }

    render() {
      const {userAnswers} = this.state;

      return <Component
        {...this.props}
        onAnswer={this.handleAnswerSubmit}
        userAnswers={userAnswers}
        onAnswerChange={this.handleAnswerChange}
      />;
    }
  }

  WithUserAnswer.propTypes = {
    onAnswer: PropTypes.func.isRequired,
    question: PropTypes.shape().isRequired,
  };

  return WithUserAnswer;
};

export default withUserAnswer;
