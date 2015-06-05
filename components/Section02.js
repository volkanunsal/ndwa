import React from 'react';
import t from 'tcomb-form';
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');
import ActionBar from './ActionBar';

var Recipient = t.struct({
  name: t.Str,
  age: t.Num,
  description_of_care: t.Str
});


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
      children: t.list(Recipient),
      childcare_tasks: t.list(t.Str),
      cleaning_tasks: t.list(t.Str),
      home_care_recipients: t.list(Recipient),
      home_care_tasks: t.list(t.Str)
    });
    var Page2 = t.struct({
      description: t.maybe(t.Str)
    });
    return [Page1, Page2]
  }

  getPageOptions(contract, flux){
    var Page1 = {
      legend: <p className='lead'>What are the work responsibilities?</p>,
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
          disableOrder: true,
          item: {
            fields: {
              age: {
                type: 'number',
                attrs:{
                  min: 0,
                  max: 20
                },
                config: {
                  addonAfter: <i>years old</i>
                }
              },
              description_of_care: {
                type: 'textarea'
              }
            }
          }
        },
        childcare_tasks: {
          label: ' ',
          i18n: {
            add: '+ Task',
            optional: ' (optional)',
            remove: 'Remove'
          },
          disableOrder: true,
          item: {
            help: <i>Describe the task</i>,
            type: 'textarea'
          }
        },
        cleaning_tasks: {
          label: ' ',
          i18n: {
            add: '+ Task',
            optional: ' (optional)',
            remove: 'Remove'
          },
          disableOrder: true,
          item: {
            help: <i>Describe the task</i>,
            type: 'textarea'
          }
        },
        home_care_tasks: {
          label: ' ',
          i18n: {
            add: '+ Task',
            optional: ' (optional)',
            remove: 'Remove'
          },
          disableOrder: true,
          item: {
            help: <i>Describe the task</i>,
            type: 'textarea'
          }
        },
        home_care_recipients: {
          label: ' ',
          auto: 'placeholders',
          i18n: {
            add: '+ Care Recipient',
            optional: ' (optional)',
            remove: 'Remove'
          },
          disableOrder: true,
          item: {
            fields: {
              age: {
                type: 'number',
                attrs:{
                  min: 0,
                  max: 150
                },
                config: {
                  addonAfter: <i>years old</i>
                }
              },
              description_of_care: {
                type: 'textarea'
              }
            }
          }
        }
      },
      template: function (locals) {
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
    };
    var Page2 = {
      fields: {
        description: {
          label: <p className='lead'>Are there additional responsibilities? (Please elaborate.)</p>,
          auto: 'placeholders',
          type: 'textarea'
        }
      }
    };
    return [Page1, Page2]
  }

  getPage(){
    let pageNum = (this.props.params.pageName || 1) - 1;
    let {contract} = this.props;
    let pageOptions = this.getPageOptions(contract, this.props.flux)[pageNum];

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