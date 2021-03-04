import React, { Fragment } from 'react';

// Импорт компонентов
import Introduce from "../Introduce";
import Photosessions from "../Photosessions";

// Импорт стилей
import './styles.scss';

export default function Index(props) {
  return (
    <Fragment>
      <Introduce />
      <Photosessions />
    </Fragment>
  );
}