import React from 'react';
import { Flux, Actions, Store } from 'flummox';
import DocumentTitle from 'react-document-title';
import { RouteHandler } from 'react-router';
import { PropTypes } from 'react';
import { contractPropTypes } from 'schema';
require('./styles/Main.scss');
require('./jspdf');

// //================ ACTIONS =======================

class NavigationActions extends Actions {
  leavePage(num){

  }

  enterPage(num){

  }
}


// //================ STORES =======================

class EmployeeStore extends Store {
  constructor(flux){
    super();
    this.state = {
      yo: false
    }
  }
}
class EmployerStore extends Store {}
class QuestionStore extends Store {}
class WorkdayStore extends Store {}
class ResponsibilityStore extends Store {}
class RecipientStore extends Store {}
class TaskStore extends Store {}
class ProgressStore extends Store {
  constructor(flux){
    super();
    // TODO: copy the events and state transitions from the section map
    let sectionTransitionMap = require('./data/sectionTransitionMap');

    // TODO: grab the section name from the router
    let currentSection = this.props.params;
    let transitionMap = sectionTransitionMap[currentSection];
    let events = transitionMap;
    // By convention, the first state is always start
    let initial = 'start';

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