import React from 'react';
import Icon from "../Icon";

// Импорт стилей
import './styles.scss';

export default function Socials(props) {
  return (
    <div className="socials">
      <a href="https://www.instagram.com/photo_romanchuk/"><Icon name="instagram" size={25}/></a>
      <a href="https://vk.com/polina.romanchuk/"><Icon name="vkontakte" size={25}/></a>
      <a href="viber://chat?number=+380950742282"><Icon name="viber" size={25}/></a> 
      <a href="https://telegram.me/photo_romanchuk"><Icon name="telegram" size={25}/></a>
    </div>
  );
}