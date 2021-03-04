import React from "react"

// Компоненты
import Contacts from "../../modules/Contacts";

// Стили
import "./styles.scss";

export default function Footer(props) {
  return (
    <footer>
      { /*Контактная информация*/}
      <Contacts />
    </footer>
  )
}