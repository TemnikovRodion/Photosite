import React from "react"

import './styles.scss';


export default function Contacts(props) {
  return (
    <section className="contacts" >
      <div className="signature">
        <p className="logotype">RP</p>
        <p className="copyright">&#169; {`2020-${new Date().getFullYear()}`}<br /> Все права защищены.</p>
      </div>

      <div className="numbers">
        <p>Контакты:</p>
        <p>+38 (071) 414-58-02</p>
        <p>+38 (095) 074-22-82</p>
      </div>
    </section >
  )
}