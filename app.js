import React from 'react';
import { Flux, Actions, Store } from 'flummox';
import DocumentTitle from 'react-document-title';
import { RouteHandler } from 'react-router';
require('font-awesome-webpack');
require('./styles/Main.scss');
import assign from 'object-assign';
import I from 'immutable';
import moment from 'moment';
import ContractStore from './stores/ContractStore';
import NavigationStore from './stores/NavigationStore';

//================ ACTIONS =======================
export class CalendarActions extends Actions {
  toggleDay(day){ return day }
  updateDay(day, position, hours){ return {day, position, hours} }
}
export class ContractActions extends Actions {
  setIn(path, value){ return {path, value} }
  merge(value){ return value }
  validateSections(contract) { return contract }
}
//================ APP =======================
export class AppFlux extends Flux {
  constructor() {
    super();
    // actions
    this.createActions('calendar_actions', CalendarActions);
    this.createActions('contract_actions', ContractActions);
    // stores
    this.createStore('nav', NavigationStore, this);
    this.createStore('contract', ContractStore, this);
  }
}
const flux = new AppFlux();

// The App
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


App.defaultProps = {flux};