import React from 'react';
import t from 'tcomb-form';
var {Form} = t.form;
var router = require('../router');
var {nextPageOrSection} = require('../utils/NavUtils');
  
export default {
  getForm(Component) {
    Component.prototype.save = function save(){
      // call getValue() to get the values of the form
      var value = this.refs.form.getValue();

      // if validation fails, value will be null
      if (value) {
        // Update the contract
        this.props.flux.getActions('contract_actions').merge(value)
        router.transitionTo('page', nextPageOrSection(this.props));
      }
    }

    Component.prototype.getValidator = function getValidator(){
      let {params, nav} = this.props;
      let {pageName, sectionName} = params;
      let pageNum     = (pageName || 1) - 1;
      let sectionNum  = Number(sectionName) - 1;
      return nav.sections[sectionNum].pages[pageNum].types;
    }

    Component.prototype.getForm = function getForm(){
      let form, page;
      let {params, contract, nav} = this.props;
      let {pageName, sectionName} = params;

      let pageNum     = (pageName || 1) - 1;
      let sectionNum  = Number(sectionName) - 1;

      let pageOptions = this.getPageOptions(contract, this.props.flux)[pageNum];
      let pageTypes = this.getValidator();


      // TODO: create a flow type for the navigation section/page JSON

      if (pageTypes) {
        form = <Form
          ref="form"
          type={pageTypes(contract)}
          options={pageOptions}
          value={contract}
        />;
        page = form;
      };

      if(pageOptions && pageOptions.config && pageOptions.config.horizontal){
        page = <div className='form-horizontal'>
          {form}
        </div>
      }

      return page
    }
  }
}