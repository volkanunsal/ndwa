import React from 'react';
import { Route, DefaultRoute, NotFoundRoute, Redirect }  from 'react-router';
import HomePage from './pages/HomePage';
import SectionPage from './pages/SectionPage';
import NotFoundPage from './pages/NotFoundPage';
import App from './app';

module.exports = (
  <Route name='app' path='/' handler={App}>
    <DefaultRoute name='home' handler={HomePage}/>
    <Route name='section' path='section/:sectionName' handler={SectionPage}>
      <Route name='page' path='p/:pageName' handler={SectionPage}/>
    </Route>
    <NotFoundRoute handler={NotFoundPage}/>
    <Redirect from="/" to="section" params={{sectionName: '1'}} />
  </Route>
);
