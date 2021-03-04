import React from 'react';
import { Switch, Route } from 'react-router-dom';


/*Компоненты сайта*/
import Index from "../../sections/site/Index";
import About from "../../sections/site/About";
import Photosession from "../../sections/site/Photosession";
import Photosessions from '../../sections/site/Photosessions';
import Publications from '../../sections/site/Publications';
import Prices from '../../sections/site/Prices';
import Preload from "../../modules/Preload";
import FixedButtons from '../../sections/site/FixedButtons';

/* Компоненты админ-панели */
import Admin from "../../sections/admin/Admin";

// Стили
import "./styles.scss";

export default function Main(props) {
  return (
    <main>
      <Preload />

      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/about" component={About} />
        <Route path="/portfolio" component={Photosessions} />
        <Route path="/photosession/:id" component={Photosession} />
        <Route path="/publications" component={Publications} />
        <Route path="/prices" component={Prices} />
        <Route path="/admin" component={Admin} />
      </Switch>

      <FixedButtons />
    </main>
  )
} 