import React from 'react';
import t from 'tcomb-form';
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');
import ActionBar from './ActionBar';
import decorators from '../utils/decorators';


@decorators.getForm
export default class SectionPage extends React.Component {

  save() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();

    // if validation fails, value will be null
    if (value) {
      // Update the contract
      this.props.flux.getActions('contract_actions').merge(value)
      router.transitionTo('page', nextPageOrSection(this.props));
    }
  }

  getPageOptions(contract, flux){
    var Page1 = {
      label: 'Are you a domestic worker or an employer?',
      fields: {
        user_type: {
          label: ' ',
          factory: t.form.Radio
        }
      },
      template: function(locals){
        return <div className='text-center'>
          <p className='lead'>{locals.label}</p>
          <div className='form-inline q-domestic-or-employer'>
            {React.addons.createFragment(locals.inputs)}
          </div>
        </div>
      }
    };
    var Page2 = {
      // auto: 'placeholders',
      legend: 'This agreement is between the following parties',
      config: {
        horizontal: {
          lg: [2, 10]
        }
      },
      template: function(locals){
        return <div>
          <p className='lead'>{locals.label}</p>
          {React.addons.createFragment(locals.inputs)}
        </div>;
      }
    };
    var Page3 = {
      fields: {
        work_address: {
          label: <p className='lead'>Where will the work take place?</p>,
          help: <i>Please enter an address</i>,
          config: {
            addonBefore: <span className='fa fa-map-marker'/>
          }
        },
        start_date: {
          label: <p className='lead'>On what date will this agreement begin?</p>
        }
      }
    };
    return [Page1, Page2, Page3]
  }

  render() {
    return <div className='form-section'>
      <div className='container-fluid'>
        {this.getForm()}
      </div>
      <ActionBar handleSave={this.save.bind(this)}/>
    </div>
  }
}