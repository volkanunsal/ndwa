import React from 'react';
import t from 'tcomb-form';
var {Form} = t.form;

export default {
  getForm(Component) {
    Component.prototype.getForm = function getForm(){
      let form, page;
      let {params, contract, nav} = this.props;
      let {pageName, sectionName} = params;

      let pageNum     = (pageName || 1) - 1;
      let sectionNum  = Number(sectionName) - 1;

      let pageOptions = this.getPageOptions(contract, this.props.flux)[pageNum];
      let pageTypes = nav.sections[sectionNum].pages[pageNum].types;


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