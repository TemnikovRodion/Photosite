import React from 'react';
import { Link } from 'react-router-dom';

// Импорт стилей
import './styles.scss';

export default function AsideNavigation(props) {
    return (
        <aside className="asideNav">
            <div className="asideFixedNav">
                <Link className="asideNavLink" to='/admin/aboutAdmin'>Обо мне</Link>
                <Link className="asideNavLink" to='/admin/photosessionsAdmin'>Портфолио</Link>
                <Link className="asideNavLink" to='/admin/publicationsAdmin'>Публикации</Link>
                <Link className="asideNavLink" to='/admin/servicesAdmin'>Услуги</Link>
            </div>
        </aside>
    );
}