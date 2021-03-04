import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from "../Icon";

// Импорт компонентов
import Modal from "../Modal";

// Импорт стилей
import './styles.scss';

export default function Navigation(props) {
  const [visibility, setVisibility] = useState(false);

  return (
    <Fragment>
      { visibility && <Modal visibility={visibility} isNotInRoot={true} onClick={() => setVisibility(false)} />}

      <nav className="nav">
        <button className="nav-toggle" onClick={() => setVisibility(!visibility)}>
          {
            <Icon name={visibility ? "close" : "bars"} size={25} />
          }
        </button>

        <ul className={visibility ? "nav-list open" : "nav-list"} onClick={() => setVisibility(false)}>
          <li><Link to="/">Главная</Link></li>
          <li><Link to='/about'>Обо мне</Link></li>
          <li><Link to='/portfolio'>Портфолио</Link></li>
          <li><Link to='/publications'>Публикации</Link></li>
          <li><Link to='/prices'>Стоимость</Link></li>
          <li className="nav-socials">
            <div className="nav-wrapper"></div>
            <a href="https://www.instagram.com/photo_romanchuk/" className="nav-socials-link instagram">
              <p>Instagram</p>
              <Icon name="instagram" size={25} />
            </a>
            <a href="https://vk.com/polina.romanchuk/" className="nav-socials-link vkontakte">
              <p>Vkontakte</p>
              <Icon name="vkontakte" size={25} />
            </a>

            <a href="viber://add?number=380950742282" className="nav-socials-link viber">
              <p>Viber</p>
              <Icon name="viber" size={25} />
            </a>

            <a href="https://telegram.me/photo_romanchuk" className="nav-socials-link telegram">
              <p>Telegram</p>
              <Icon name="telegram" size={25} />
            </a>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
}