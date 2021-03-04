import React, { Fragment } from "react";
import Icon from '../Icon';

// Импорт стилей
import "./styles.scss";

const cruidButtons = (onDelete) => (
    <Fragment>
        <button type="submit" className="form-btn">Сохранить</button>
        <button className="form-btn" onClick={onDelete}>Удалить</button>
    </Fragment>
)

const closeButton = (onClose) => (
    <div onClick={onClose}><Icon name="close" size={25} /></div>
)

export default function Form(props) {
    return (
        <form className="form" onSubmit={props.onSubmit}>
            {/* Заголовок формы */}
            <div className="form-title">
                <h2>{props.title}</h2>
                <div className="form-btn-group">
                    {props.onDelete ? cruidButtons(props.onDelete) : null}
                    {props.onClose ? closeButton(props.onClose) : null}
                </div>
            </div>

            {/* Тело формы */}
            {props.children}
        </form>
    );
}