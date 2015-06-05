import React from 'react';
import I from 'immutable';
import moment from 'moment';
import { Store } from 'flummox';
import assign from 'object-assign';

export default class NavigationStore extends Store {
  constructor(flux){
    super();
    this.state = {
      sections: [
        {
          name: 'Getting Started',
          pages: [
            {
              name: 'About you'
            },
            {
              name: 'Parties'
            },
            {
              name: 'Location'
            }
          ]
        },
        {
          name: 'Responsibilities',
          pages: [
            {
              name: 'Job Description'
            },
            {
              name: 'Additional Tasks'
            }
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
            {
              name: 'Pay Rate'
            },
            {
              name: 'Time Off'
            },
            {
              name: 'Cancellations'
            },
            {
              name: 'Room'
            },
            {
              name: 'Board'
            }
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
            {
              name: 'Worker'
            },
            {
              name: 'Family'
            }
          ]
        },
        {
          name: 'Termination',
          pages: [
            {
              name: 'Severance & Lodging'
            },
            {
              name: 'Immediate Termination'
            }
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
