import React from 'react';
var t = require('tcomb-form');
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');

var Recipient = t.struct({
  name: t.Str,
  age: t.Num,
  description_of_care: t.Str
});

var Page1Form = t.struct({
  children: t.list(Recipient),
  childcare_tasks: t.list(t.Str),
  cleaning_tasks: t.list(t.Str),
  home_care_recipients: t.list(Recipient),
  home_care_tasks: t.list(t.Str)
});

var Page2Form = t.struct({
  description: t.maybe(t.Str)
});

var page2FormLayout = function (locals) {
  return <div>
    <h3>{locals.label}</h3>
    <div className='row'>
      <div className='col-lg-6'>
        {locals.inputs.description}
      </div>
    </div>

  </div>
}
var page1FormLayout = function (locals) {
  let {
    children
    , childcare_tasks
    , cleaning_tasks
    , home_care_recipients
    , home_care_tasks
  } = locals.inputs;

  return <div className='row'>
    <div className='col-lg-12'>
      {locals.label}
    </div>
    <div className='col-lg-12'>
      <h4>Childcare & Nanny Services</h4>
      {children}
      {childcare_tasks}
    </div>
    <div className='col-lg-12'>
      <h4>House Cleaning & Home Management</h4>
      {cleaning_tasks}
    </div>
    <div className='col-lg-12'>
      <h4>Home Care & Elder Care</h4>
      {home_care_recipients}
      {home_care_tasks}
    </div>
  </div>
}

var RecipientLayout = function (locals) {
  return <div>

  </div>
}

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
        options: {
          legend: <h3>What are the work responsibilities?</h3>,
          auto: 'placeholders',
          fields: {
            children: {
              label: ' ',
              auto: 'placeholders',
              i18n: {
                add: '+ Child',
                optional: ' (optional)',
                remove: 'Remove'
              },
              disableOrder: true
            },
            childcare_tasks: {
              label: ' ',
              i18n: {
                add: '+ Task',
                optional: ' (optional)',
                remove: 'Remove'
              },
              disableOrder: true
            },
            cleaning_tasks: {
              label: ' ',
              i18n: {
                add: '+ Task',
                optional: ' (optional)',
                remove: 'Remove'
              },
              disableOrder: true
            },
            home_care_tasks: {
              label: ' ',
              i18n: {
                add: '+ Task',
                optional: ' (optional)',
                remove: 'Remove'
              },
              disableOrder: true
            },
            home_care_recipients: {
              label: ' ',
              auto: 'placeholders',
              i18n: {
                add: '+ Care Recipient',
                optional: ' (optional)',
                remove: 'Remove'
              },
              disableOrder: true
            }
          },
          template: page1FormLayout
        }
      },
      {
        type: Page2Form,
        options: {
          legend: 'Are there additional responsibilities? (Please elaborate.)',
          fields: {
            description: {
              label: ' ',
              auto: 'placeholders',
              type: 'textarea'
            }
          },
          template: page2FormLayout
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