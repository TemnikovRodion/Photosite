import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './app/redux/store';

/*Компоненты*/
import Header from './app/components/template/Header';
import Main from './app/components/template/Main';
import Footer from './app/components/template/Footer';

/*Стили*/
import './app/assets/resourses/scss/site.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);