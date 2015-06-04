import React from 'react';
var t = require('tcomb-form');
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');
import cx from 'classnames';
import compact from '../utils/compact';
import isEmpty from '../utils/isEmpty';
import YesNo from './YesNo'




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

    let deductions = contract.deductions_taken ? t.struct({
        state_income_tax: t.Str,
        federal_income_tax: t.Str,
        health_insurance: t.Str,
        food: t.Str,
        lodging: t.Str,
        other: t.Str
      }) : false;

    var Page1 = t.struct(compact({
      deductions_taken: t.Bool,
      deductions
    }));
    return [Page1]
  }

  getPageOptions(contract){
    let props = this.props;
    var Page1 = {

      fields: {
        deductions_taken: {
          label: 'Will the family take deductions from the employee\'s wages?',
          template: function(locals){
            return <div className='text-center'>
              <YesNo flux={props.flux} {...locals}/>
            </div>
          }
        },
        deductions: {
          label: 'Which of the following deductions will made?',
          config: {
            horizontal: {
              lg: [2, 10],
              md: [2, 10],
              sm: [6, 6]
            }
          },
          fields: {
            state_income_tax: {
              type: 'number',
              attrs: {
                min: 0
              },
              config: {
                addonAfter: <i>frequency</i>
              }
            },
            federal_income_tax: {
              type: 'number',
              attrs: {
                min: 0
              },
              label: 'Federal Income Tax',
              config: {
                addonAfter: <i>frequency</i>
              }
            },
            health_insurance: {
              type: 'number',
              attrs: {
                min: 0
              },
              label: "Employee contribution to Health Insurance",
              config: {
                addonAfter: <i>frequency</i>
              }
            },
            food: {
              type: 'number',
              attrs: {
                min: 0
              },
              label: "Food and Beverages",
              config: {
                addonAfter: <i>frequency</i>
              }
            },
            lodging: {
              type: 'number',
              attrs: {
                min: 0
              },
              label: "Lodging/Living Accommodations",
              config: {
                addonAfter: <i>frequency</i>
              }
            },
            other: {
              type: 'number',
              attrs: {
                min: 0
              },
              config: {
                addonAfter: <i>frequency</i>
              }
            }
          },
          template: function(locals){
            return <div className='form-horizontal'>
              <p className='lead'>{locals.label}</p>
              {React.addons.createFragment(locals.inputs)}
            </div>
          }
        }
      }
    };

    return [Page1]
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
        <a className='btn btn-primary' onClick={this.save.bind(this)}>Save</a>
      </div>
    </div>
  }
}