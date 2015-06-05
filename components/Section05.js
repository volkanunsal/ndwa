import React from 'react';
var t = require('tcomb-form');
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');
import cx from 'classnames';
import compact from '../utils/compact';
import isEmpty from '../utils/isEmpty';
import YesNo from './YesNo'
import ActionBar from './ActionBar';

export default class SectionPage extends React.Component {
  getPageTypes(contract){

    var Page1 = t.struct({
      benefits: t.struct({
        health: t.Bool,
        transportation: t.Bool,
        notes: t.maybe(t.Str)
      }),
      workers_comp_insurance: t.struct({
        company: t.Str,
        policy: t.Str
      })
    });
    return [Page1]
  }

  getPageOptions(contract){
    let props = this.props;

    var Page1 = {
      config: {
        horizontal: {
          lg: [2, 10],
          md: [2, 10],
          sm: [6, 6]
        }
      },
      fields: {
        workers_comp_insurance: {
          label: "What are the employer’s workers' compensation company and information?",
          template: function(locals){
            return <div>
              <p className='lead'>{locals.label}</p>
              {React.addons.createFragment(locals.inputs)}
            </div>
          },
          fields: {
            company: {
              label: 'Insurance Company'
            },
            policy: {
              label: 'Insurance Policy'
            }
          }
        },
        benefits: {
          label: 'Which benefits will the employer offer the employee during the employee\'s employment?',
          template: function(locals){
            return <div>
              <p className='lead'>{locals.label}</p>
              {React.addons.createFragment(locals.inputs)}
            </div>
          },
          fields: {
            health: {
              label: "Paid Health Insurance?",
              template: function(locals){
                return <YesNo flux={props.flux} {...locals}/>
              }
            },
            transportation: {
              label: "Transportation costs?",
              template: function(locals){
                return <YesNo flux={props.flux} {...locals}/>
              }
            },
            notes: {
              label: ' ',
              type: 'textarea',
              attrs: {
                placeholder: "￼Further details (i.e., if certain benefits are not paid, not paid in full, etc., or additional benefits)"
              }
            }
          }

        }

      }
    }
    return [Page1]
  }

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
      <ActionBar handleSave={this.save.bind(this, this.props.calendar)}/>
    </div>
  }
}