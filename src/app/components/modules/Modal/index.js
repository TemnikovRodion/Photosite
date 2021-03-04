import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

// Стили
import './styles.scss';

// Запрет скролла окна
function disableScroll() {
  let bodyElement = document.body;
  bodyElement.classList.add("disable-scroll");
} // disableScroll

// Разрешение скролла окна
function enableScroll() {
  let bodyElement = document.body;
  bodyElement.classList.remove("disable-scroll");
} // enableScroll

export default function Modal(props) {
  const appRoot = document.getElementById('root');
  
  const modal = (
    <div className={props.visibility ? "modal show" : "modal"} onClick={props.onClick}>
      {props.children}
    </div>
  )

  useEffect(() => {
    disableScroll();
    return () => { enableScroll() };
  })

  return (
    props.isNotInRoot ?
      modal :
      ReactDOM.createPortal(modal, appRoot)
  );
}