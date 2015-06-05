import React from 'react';
import { Flux, Actions, Store } from 'flummox';
import DocumentTitle from 'react-document-title';
import { RouteHandler } from 'react-router';
require('font-awesome-webpack');
require('./styles/Main.scss');
import assign from 'object-assign';
import I from 'immutable';
import moment from 'moment';
import CalendarStore from './stores/CalendarStore';
import ContractStore from './stores/ContractStore';


//================ ACTIONS =======================
export class CalendarActions extends Actions {
  toggleDay(day){ return day }
  updateDay(day, position, hours){ return {day, position, hours} }
}
export class ContractActions extends Actions {
  setIn(path, value){ return {path, value} }
  merge(value){ return value }
}
  
//================ STORES =======================
export class NavigationStore extends Store {
  constructor(flux){
    super();
    this.state = {
      sections: [
        {
          name: 'Getting Started',
          pages: [
            {name: 'About you'},
            {name: 'Parties'},
            {name: 'Location'}
          ]
        },
        {
          name: 'Responsibilities',
          pages: [
            {name: 'Job Description'},
            {name: 'Additional Tasks'}
          ]
        },
        {
          name: 'Scheduling',
          pages: [

          ]
        },
        {
          name: 'Compensation & Provisions',
          pages: [
            {name: 'Pay Rate'},
            {name: 'Time Off'},
            {name: 'Cancellations'},
            {name: 'Room'},
            {name: 'Board'}
          ]
        },
        {
          name: 'Insurance',
          pages: [

          ]
        },
        {
          name: 'Deductions',
          pages: [

          ]
        },
        {
          name: 'Evaluation',
          pages: [

          ]
        },
        {
          name: 'Privacy & Confidentiality',
          pages: [
            {name: 'Worker'},
            {name: 'Family'}
          ]
        },
        {
          name: 'Termination',
          pages: [
            {name: 'Severance & Lodging'},
            {name: 'Immediate Termination'}
          ]
        },
        {
          name: 'Finish',
          pages: [

          ]
        }
      ]
    }
  }

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
    this.createStore('calendar', CalendarStore, this);
    // this.createStore('employee', EmployeeStore, this);
    // this.createStore('employer', EmployerStore, this);
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