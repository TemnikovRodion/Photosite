import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import Icon from '../../modules/Icon';

// Импорт стилей
import './styles.scss';

export default function Toast(props) {
  const dispatch = useDispatch();
  const appRoot = document.getElementById('root');

  const toast = (
    <div className={`toast ${props.theme}`}>
        <Icon name={'info'} size={20}/>
        {props.message}
    </div>
  )

  useEffect(() => {
    setTimeout(
      () => dispatch(props.onClose), 
      4000);
  })

  return (
    props.message ? ReactDOM.createPortal(toast, appRoot) : null
  );
}