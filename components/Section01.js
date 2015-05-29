import React from 'react';
var t = require('tcomb-form');
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');

var UserType = t.enums({
  W: 'Domestic Worker',
  E: 'Employer'
});

var Employer = {
  employer_name: t.Str,
  employer_address: t.Str,
  employer_phone: t.Str,
  employer_email: t.maybe(t.Str),

  employee_name: t.Str,
  employee_address: t.Str,
  employee_phone: t.Str,
  employee_email: t.maybe(t.Str)
};

var WorkLocation = {
  work_address: t.Str,
  start_date: t.Dat
}

var page1FormLayout = function(locals){
  return (
    <div>
      <h3>{locals.label}</h3>
      <div>{locals.inputs.UserType}</div>
    </div>
  )
}

var page2FormLayout = function(locals){
  return (
    <div>
      <h3>{locals.label}</h3>
      <div className='row'>
        <div className='col-lg-6'>
          {locals.inputs.employer_name}
          {locals.inputs.employer_address}
          {locals.inputs.employer_phone}
          {locals.inputs.employer_email}
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-6'>
          <h3 style={{marginTop:-10}}>and</h3>
          {locals.inputs.employee_name}
          {locals.inputs.employee_address}
          {locals.inputs.employee_phone}
          {locals.inputs.employee_email}
        </div>
      </div>
    </div>
  );
};

var page3FormLayout = function(locals){
  return (
    <div>
      <div className='row'>
        <div className='col-lg-6'>
          <h3>Where will the work take place?</h3>
          {locals.inputs.work_address}
          <h3 style={{marginTop:-10}}>
            On what date will this agreement begin?
          </h3>
          {locals.inputs.start_date}
        </div>
      </div>
    </div>
  );
};





export default class SectionPage extends React.Component {

  save() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();

    // if validation fails, value will be null
    if (value) {
      // TODO: call the contract action creator to update the contract
      router.transitionTo('page', nextPageOrSection(this.props));

    }
  }

  getPage(){
    let formOptions = [
      {
        type: t.struct({UserType}),
        options: {
          legend: 'Are you a domestic worker or an employer?',
          fields: {
            UserType: {
              label: ' ',
              factory: t.form.Radio
            }
          },
          template: page1FormLayout
        }
      },
      {
        type: t.struct(Employer),
        options: {
          template: page2FormLayout,
          auto: 'placeholders',
          legend: 'This agreement is between'
        }
      },
      {
        type: t.struct(WorkLocation),
        options: {
          auto: 'placeholders',
          template: page3FormLayout
        }
      }
    ];
    let page = (this.props.params.pageName || 1) - 1;
    return <Form
      ref="form"
      type={formOptions[page].type}
      options={formOptions[page].options}
    />
  }

  render() {
    return <div className='form-section'>
      <div className='container-fluid'>
        {this.getPage()}
        <a className='btn btn-primary' onClick={this.save.bind(this)}>Save</a>
      </div>
    </div>
  }
}