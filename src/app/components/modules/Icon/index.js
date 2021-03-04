import React from "react";
import IconsSVG from "../../../assets/resourses/images/svg/icons.svg";

// Импорт стилей
import './styles.scss';

export default function Icon(props) {
  return (
    <svg className={`icon icon-${props.name}`} width={props.size} height={props.size}>
      <use xlinkHref={ `${IconsSVG}#icon-${props.name}` }/>
    </svg>
  )
}