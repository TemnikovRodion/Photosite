import React from 'react';

// Импорт компонентов
import ButtonUp from "../../../modules/ButtonUp";
import Callback from "../../../sections/site/Callback";
import VK from "../../../modules/VkWidget";

// Импорт стилей
import './styles.scss';

export default function FixedButtons(props) {
  return (
    <div className="fixedButtons">
      <ButtonUp />
      <VK />
      <Callback />
    </div>
  );
}