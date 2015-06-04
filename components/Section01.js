import React from 'react';
var t = require('tcomb-form');
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');
import ActionBar from './ActionBar';

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

  getPageTypes(contract){
    var Page1 = t.struct({
      user_type: t.enums({
        W: 'Domestic Worker',
        E: 'Employer'
      })
    });

    var Page2 = t.struct({
      employer: t.struct({
        name: t.Str,
        address: t.Str,
        phone: t.Str,
        email: t.maybe(t.Str)
      }),
      employee: t.struct({
        name: t.Str,
        address: t.Str,
        phone: t.Str,
        email: t.maybe(t.Str)
      })
    });

    var Page3 = t.struct({
      work_address: t.Str,
      start_date: t.Dat
    });

    return [Page1, Page2, Page3]
  }

  getPageOptions(contract){
    let props = this.props;
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
          {locals.inputs}
        </div>;
      }
    };
    var Page3 = {
      fields: {
        work_address: {
          label: 'Where will the work take place?',
          help: <i>Please enter an address</i>,
          config: {
            addonBefore: <span className='fa fa-map-marker'/>
          }
        },
        start_date: {
          label: "On what date will this agreement begin?"
        }
      }
    };
    return [Page1, Page2, Page3]
  }


  getPage(){
    let pageNum = (this.props.params.pageName || 1) - 1;
    let {contract} = this.props;
    let pageOptions = this.getPageOptions(contract)[pageNum];

    let form = <Form
      ref="form"
      type={this.getPageTypes(contract)[pageNum]}
      options={pageOptions}
      value={contract}
    />;

    let page = form;

    if(pageOptions && pageOptions.config && pageOptions.config.horizontal){
      page = <div className='form-horizontal'>
        {form}
      </div>
    }

    return page
  }

  render() {
    return <div className='form-section'>
      <div className='container-fluid'>
        {this.getPage()}
      </div>
      <ActionBar handleSave={this.save.bind(this)}/>
    </div>
  }
}