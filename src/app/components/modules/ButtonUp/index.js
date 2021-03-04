import React, { useEffect, useState } from 'react';
import Icon from '../Icon';

/* Стили */
import './styles.scss';

export default function ButtonUp() {
  // Классы блока всплывающего элемента
  const buttonUpShow = "button-up show";
  const buttonUpHide = "button-up";
  
  // Состояние видимости меню
  const[visibility, setVisibility] = useState(false);

  // Показ элементов при прокрутке страницы
  useEffect(() => {
    // Обработчик события скролла
    const handleScroll = () => {
      let deviceHeight = document.documentElement.clientHeight;

      if(window.pageYOffset >= deviceHeight / 2 && !visibility ) setVisibility(true);
      else if(window.pageYOffset < deviceHeight / 2 && visibility) setVisibility(false);
    } // handleScroll

    window.addEventListener("scroll", handleScroll);
    return () => { window.removeEventListener("scroll", handleScroll); }
  })
  
  return (
    <div className={visibility ? buttonUpShow : buttonUpHide} onClick={() => window.scrollTo(0, 0)}>
      <Icon name="button-up" size={25}/>
    </div>
  );
}