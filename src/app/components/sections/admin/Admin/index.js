import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { loginSelectors, loginActions } from '../../../../redux/reducers/loginReducer';

// Импорт компонентов
import AboutAdmin from "./sections/About/AboutAdmin";
import PhotosessionsAdmin from "./sections/Photosessions/PhotosessionsAdmin";
import PublicationsAdmin from "./sections/Publications/PublicationsAdmin";
import ServicesAdmin from "./sections/Services/ServicesAdmin";
import AsideNavigation from "./sections/AsideNavigation";
import Login from "../Login";

// Импорт стилей
import './styles.scss';

export default function Admin(props) {
  const dispatch = useDispatch();

  const isAuthorized = useSelector(loginSelectors.isAuthorized);

  useEffect(() => {
    dispatch(loginActions.checkUserToken());
  }, [dispatch]) 

  return (
    <section className='admin'>
      {
        isAuthorized ?
        (
          <Fragment>
            <AsideNavigation />

            <Switch>
              <Route path='/admin/aboutAdmin' component={AboutAdmin}></Route>
              <Route path='/admin/photosessionsAdmin' component={PhotosessionsAdmin}></Route>
              <Route path='/admin/publicationsAdmin' component={PublicationsAdmin}></Route>
              <Route path='/admin/servicesAdmin' component={ServicesAdmin}></Route>
            </Switch>
          </Fragment>
        ) :
        <Login />
      }
    </section >
  );
}