import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';

class AuthorizationScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onLoginSubmit} = this.props;
    evt.preventDefault();
    const login = this.loginRef.current.value;
    const pwd = this.passwordRef.current.value;
    onLoginSubmit({login, pwd});
  }

  render() {
    const {onReplayButtonClick} = this.props;

    return <section className="login">
      <div className="login__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__text">Хотите узнать свой результат? Представтесь!</p>
      <form
        className="login__form"
        action=""
        onSubmit={this.handleSubmit}
      >
        <p className="login__field">
          <label className="login__label" htmlFor="name">Логин</label>
          <input className="login__input" type="text" name="name" id="name" ref={this.loginRef} autoComplete="email"/>
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">Пароль</label>
          <input className="login__input" type="password" name="password" id="password" ref={this.passwordRef} autoComplete="current-password" />
          <span className="login__error">Неверный пароль</span>
        </p>
        <button className="login__button button" type="submit">Войти</button>
      </form>
      <Link
        className="replay"
        type="button"
        to={AppRoute.ROOT}
        onClick={onReplayButtonClick}
      >
        Сыграть ещё раз
      </Link>
    </section>;
  }
}

AuthorizationScreen.propTypes = {
  onLoginSubmit: PropTypes.func.isRequired,
  onReplayButtonClick: PropTypes.func.isRequired,
};

export default AuthorizationScreen;
