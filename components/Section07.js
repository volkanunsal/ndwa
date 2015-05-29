import React from 'react';
var t = require('tcomb-form');
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');


var Page1Form = t.struct({
  evaluation_after_three_months: t.Bool,
  evaluation_every_year: t.Bool,
  complaint_handling_process: t.Str
});


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
        type: Page1Form,
        options: {}
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