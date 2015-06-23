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
import FormStore from './stores/FormStore';


//================ ACTIONS =======================
export class CalendarActions extends Actions {
  toggleDay(day){ return day }
  updateDay(day, position, hours){ return {day, position, hours} }
}
export class FormActions extends Actions {
  validateSections(contract) { return contract }
  validateSection(sectionNum) { return sectionNum }
}
export class ContractActions extends Actions {
  setIn(path, value){ return {path, value} }
  merge(value){ return value }
  addParties(){ return null }
}
//================ APP =======================
export class AppFlux extends Flux {
  constructor() {
    super();
    // actions
    this.createActions('calendar_actions', CalendarActions);
    this.createActions('contract_actions', ContractActions);
    this.createActions('form_actions', FormActions);

    // stores
    this.createStore('contract', ContractStore, this);
    this.createStore('form', FormStore, this);

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
      <DocumentTitle title={'Inhouse Agreements | Generate work agreements effortlessly'}>
        <div>
          <RouteHandler {...this.props} />
        </div>
      </DocumentTitle>
    );
  }
}


App.defaultProps = {flux};