import React from 'react';
import { Route, DefaultRoute }  from 'react-router';
import HomePage from './pages/HomePage';
import App from './app';

module.exports = (
  <Route name='app' path='/' handler={App}>
    <DefaultRoute name='home' handler={HomePage}/>
    <Route name='section' path='section/:name' handler={HomePage}>
        <Route name='page' path='p/:pageName' handler={HomePage}/>
    </Route>
  </Route>
);
