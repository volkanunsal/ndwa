'use strict';
import React from 'react';
import { Route, DefaultRoute }  from 'react-router';
import HomePage from './pages/HomePage';
import App from './app';

module.exports = (
  <Route name='app' path={__PRERELEASE__ ? '/ndwa' : '/'} handler={App}>
    <DefaultRoute name='home' handler={HomePage}/>
  </Route>
);
