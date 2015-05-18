'use strict';
import React from 'react';
import DocumentTitle from 'react-document-title';
import { RouteHandler } from 'react-router';
import { PropTypes } from 'react';
require('./styles/Main.scss');

export default class App extends React.Component {
  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  }

  render() {
    return (
      <DocumentTitle title={'National Domestic Workers Alliance'}>
        <div>
          <RouteHandler {...this.props} />
        </div>
      </DocumentTitle>
    );
  }
}
