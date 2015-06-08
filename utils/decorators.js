import React from 'react';
import t from 'tcomb-form';
var {Form} = t.form;
var router = require('../router');
var {nextPageOrSection} = require('../utils/NavUtils');

export default {
  getForm(Component) {
    Component.prototype.handleFormChange = function handleFormChange(value){
      this.props.flux.getActions('contract_actions').merge(value)
    }

    Component.prototype.save = function save(){
      // call getValue() to get the values of the form
      var value = this.refs.form.getValue();

      // if validation fails, value will be null
      if (value) {
        // Update the contract
        let contractActions = this.props.flux.getActions('contract_actions');
        let formActions = this.props.flux.getActions('form_actions');
        contractActions.merge(value);

        setTimeout(()=>{
          // FormStore waits for the contract store
          let sectionNum = Number(this.props.params.sectionName) - 1;
          formActions.validateSection(sectionNum, this.props.contract);
          router.transitionTo('page', nextPageOrSection(this.props));
        },1)
      }
    }

    // TODO: remove duplication between the save functions
    Component.prototype.saveSchedule = function saveSchedule() {
      let {contract} = this.props;
      let validatorFn = this.getValidator();
      let {work_week_duration, valid_work_schedule} = contract;
      let isValid = t.validate({work_week_duration, valid_work_schedule}, validatorFn()).isValid();
      this.setState({isValid})

      // if fieldValidation fails, value will be null
      if (isValid) {
        // Update the contract
        let contractActions = this.props.flux.getActions('contract_actions');
        let formActions = this.props.flux.getActions('form_actions');
        contractActions.merge({work_week_duration, valid_work_schedule});

        setTimeout(()=>{
          // FormStore waits for the contract store
          let sectionNum = Number(this.props.params.sectionName) - 1;
          formActions.validateSection(sectionNum, this.props.contract);
          router.transitionTo('page', nextPageOrSection(this.props));
        },1)
      }
    }

    Component.prototype.getValidator = function getValidator(){
      let {params, form} = this.props;
      let {pageName, sectionName} = params;
      let pageNum     = (pageName || 1) - 1;
      let sectionNum  = Number(sectionName) - 1;
      return form.sections[sectionNum].pages[pageNum].types;
    }

    Component.prototype.getForm = function getForm(){
      let formComp, page;
      let {params, contract, form} = this.props;
      let {pageName, sectionName} = params;

      let pageNum     = (pageName || 1) - 1;
      let sectionNum  = Number(sectionName) - 1;

      let pageOptions = this.getPageOptions(contract, this.props.flux)[pageNum];
      let pageTypes   = this.getValidator();

      // TODO: create a flow type for the navigation section/page JSON
      if (pageTypes) {
        formComp = <Form
          ref="form"
          type={pageTypes(contract)}
          options={pageOptions}
          value={contract}
          onChange={this.handleFormChange.bind(this)}
        />;
        page = formComp;
      };

      if(pageOptions && pageOptions.config && pageOptions.config.horizontal){
        page = <div className='form-horizontal'>
          {formComp}
        </div>
      }

      return page
    }
  }
}