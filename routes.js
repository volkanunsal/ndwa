import React from 'react';
import { Route, DefaultRoute, NotFoundRoute }  from 'react-router';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import App from './app';

module.exports = (
  <Route name='app' path='/' handler={App}>
    <DefaultRoute name='home' handler={HomePage}/>
    <Route name='section' path='section/:sectionName' handler={HomePage}>
        <Route name='page' path='p/:pageName' handler={HomePage}/>
    </Route>
    <NotFoundRoute handler={NotFoundPage}/>
  </Route>
);
