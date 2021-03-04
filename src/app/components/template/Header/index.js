import React from 'react';

// Компоненты
import Logo from '../../modules/Logo';
import Navigation from '../../modules/Navigation';
import Socials from '../../modules/Socials';

// Стили
import "./styles.scss";

class Header extends React.Component {
  render() {
    return (
      <header>
        { /*Заголовок*/}
        <Logo />

        { /*Навигация*/}
        <Navigation />

        { /*Социальные сети*/}
        <Socials />
      </header>
    );
  }
}

export default Header;