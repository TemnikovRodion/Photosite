import React from 'react';

// Импорт стилей
import "./styles.scss";

export default function Preload(props) {
    return (
        <div id="preloader">
            <div className="preloader-logo">
                <h1 className="preloader-logo-text">Polina Romanchuk</h1>
            </div>
            <div className="preloader-circle"></div>
        </div>
    )
}