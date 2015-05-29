import React from 'react';
import { Flux, Actions, Store } from 'flummox';
import DocumentTitle from 'react-document-title';
import { RouteHandler } from 'react-router';
import { PropTypes } from 'react';
import { contractPropTypes } from 'schema';
require('font-awesome-webpack');
require('./styles/Main.scss');


//================ ACTIONS =======================
class NavigationActions extends Actions {
  leavePage(num){}
  enterPage(num){}
}
class CalendarActions extends Actions {
  enableTime(){
    // ???
  }
}

// //================ STORES =======================
class EmployeeStore extends Store {}
class EmployerStore extends Store {}
class QuestionStore extends Store {}
class WorkdayStore extends Store {}
class ResponsibilityStore extends Store {}
class RecipientStore extends Store {}
class TaskStore extends Store {}
class CalendarStore extends Store {
  constructor(flux) {
    super(); // Don't forget this step
    const CAL_ACTION_IDS = flux.getActionIds('calendar_actions');
    this.register(CAL_ACTION_IDS.enableTime, this.handleEnableTime);
  }
  handleEnableTime(){
  }
}
export class NavigationStore extends Store {
  constructor(flux){
    super();
    this.state = {
      sections: [
        {pages: ['About you', 'Parties', 'Location'], name: 'Getting Started'},
        {pages: ['Job Description', 'Additional Tasks'], name: 'Responsibilities'},
        {pages: [], name: 'Scheduling'},
        {pages: ['Pay Rate', 'Time Off', 'Cancellations', 'Room', 'Board'], name: 'Compensation & Provisions'},
        {pages: [], name: 'Insurance'},
        {pages: [], name: 'Deductions'},
        {pages: [], name: 'Evaluation'},
        {pages: ['Worker', 'Family'], name: 'Privacy & Confidentiality'},
        {pages: ['Severance & Lodging', 'Immediate Termination'], name: 'Termination'},
        {pages: [], name: 'Finish'}
      ]
    }
  }

}
class ContractStore extends Store {

  constructor(flux) {
    super(); // Don't forget this step
    const NAV_ACTION_IDS = flux.getActionIds('navigations');
    const APP_ACTION_IDS = flux.getActionIds('app');
    this.register(NAV_ACTION_IDS.leavePage, this.handleNavigation);
    this.register(NAV_ACTION_IDS.enterPage, this.handleNavigation);
    this.state = {};
  }

  handleNavigation({leaving, entering}){
    // TODO: call the appropriate event method on the fsm
  }
}
ContractStore.propTypes = contractPropTypes;


//================ APP =======================
export class AppFlux extends Flux {
  constructor() {
    super();
    // actions
    this.createActions('navigations', NavigationActions);
    // stores
    this.createStore('nav', NavigationStore, this);
    this.createStore('contracts', ContractStore, this);
    this.createStore('employee', EmployeeStore, this);
    this.createStore('employer', EmployerStore, this);
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