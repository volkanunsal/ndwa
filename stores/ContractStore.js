import React from 'react';
import I from 'immutable';
import moment from 'moment';
import { Store } from 'flummox';
import assign from 'object-assign';
import { contractPropTypes } from 'schema';

export default class ContractStore extends Store {

  constructor(flux) {
    super(); // Don't forget this step
    const APP_ACTION_IDS = flux.getActionIds('app');
    const CONTRACT_ACTION_IDS = flux.getActionIds('contract_actions');
    this.register(CONTRACT_ACTION_IDS.setIn, this.handleSetIn);
    this.register(CONTRACT_ACTION_IDS.merge, this.handleMerge);

    this.state = {
      hourly_rate: 9,
      overtime_rate: 13.5,
      vacation_days: 2,
      personal_days: 2,
      parental_leave: {
        notice_length: 2,
        paid: false
      },
      reduced_hours_reg_wage: true,
      board_provided: true,
      room: {
        provided: true,
        living_accommodations: {}
      },
      deductions_taken: false
    };
  }

  handleSetIn({path, value}){
    this.setState(I.fromJS(this.state).setIn(path, value).toJS())
  }

  handleMerge(value){
    this.setState(I.fromJS(this.state).merge(value).toJS())
  }
}
ContractStore.propTypes = contractPropTypes;
