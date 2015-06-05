import React from 'react';
var t = require('tcomb-form');
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');
import YesNo from './YesNo'
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
      evaluation_after_three_months: t.Bool,
      evaluation_every_year: t.Bool,
      complaint_handling_process: t.Str
    });
    return [Page1]
  }


  getPageOptions(contract){
    let props = this.props;
    var Page1 = {
      config: {
        horizontal: {
          lg: [4, 8],
          md: [4, 8],
          sm: [6, 6]
        }
      },
      fields: {
        evaluation_after_three_months: {
          label: "Will the employer will give the employee a written job evaluation after the first three months of employment?",
          template: function(locals){
            return <div>
              <YesNo flux={props.flux} {...locals}/>
            </div>
          }
        },
        evaluation_every_year: {
          label: "Will the employer also provide a written job evaluation every year thereafter?",
          template: function(locals){
            return <div>
              <YesNo flux={props.flux} {...locals}/>
            </div>
          }
        },
        complaint_handling_process: {
          label: 'the employer and the employee shall establish a process for addressing complaints and￼increasing pay and/or benefits. Please describe that process:',
          type: 'textarea',
          help: <i>During these reviews, both parties will have the opportunity to evaluate the contract and propose changes.</i>
        }
      }
    }
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

      </div>
      <ActionBar handleSave={this.save.bind(this, this.props.calendar)}/>
    </div>
  }
}