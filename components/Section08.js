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
      worker_privacy: t.struct({
        info_disclosure_permitted: t.Bool,
        family_pics_sharing_permitted: t.Bool,
        notes: t.maybe(t.Str)
      })
    });

    var Page2 = t.struct({
      family_privacy: t.struct({
        restrict_private_comm: t.Bool,
        surveillance: t.Bool,
        take_away_personal_docs: t.Bool,
        force_service: t.Bool,
        notes: t.maybe(t.Str)
      })
    });

    return [Page1, Page2]
  }


  getPageOptions(contract){
    let props = this.props;
    var Page1 = {
      // config: {
      //   horizontal: {
      //     lg: [4, 8],
      //     md: [4, 8],
      //     sm: [6, 6]
      //   }
      // },
      fields: {
        worker_privacy: {
          label: ' ',
          template: function(locals){
            return <div>
              {React.addons.createFragment(locals.inputs)}
            </div>
          },
          fields: {
            info_disclosure_permitted: {
              label: "Will the employee disclose any and all private information obtained about the Family during the course of employment, including but not limited to medical, financial, legal, and career information?",
              template: function(locals){
                return <div>
                  <YesNo flux={props.flux} {...locals}/>
                </div>
              }
            },
            family_pics_sharing_permitted: {
              label: "Will the employee share pictures of the Family, their home or children on social media networks or with the employee's friends and family?",
              template: function(locals){
                return <div>
                  <YesNo flux={props.flux} {...locals}/>
                </div>
              }
            },
            notes: {
              type: 'textarea',
              label: ' ',
              attrs: {
                placeholder: "Comments"
              }
            }
          }
        }
      }
    };

    var Page2 = {
      fields: {
        family_privacy: {
          label: ' ',
          template: function(locals){
            return <div>
              {React.addons.createFragment(locals.inputs)}
            </div>
          },
          fields: {
            restrict_private_comm: {
              label: "Will the Family restrict or interfere with the employee's means of private communications?",
              template: function(locals){
                return <div>
                  <YesNo flux={props.flux} {...locals}/>
                </div>
              }
            },
            surveillance: {
              label: "Will the Family employ surveillance technology to monitor the employee?",
              template: function(locals){
                return <div>
                  <YesNo flux={props.flux} {...locals}/>
                </div>
              }
            },
            take_away_personal_docs: {
              label: "Will the Family take the employee's documents or personal effects, without the employee's permission?",
              template: function(locals){
                return <div>
                  <YesNo flux={props.flux} {...locals}/>
                </div>
              }
            },
            force_service: {
              label: "Will the Family engage in conduct that constitutes forced services?",
              template: function(locals){
                return <div>
                  <YesNo flux={props.flux} {...locals}/>
                </div>
              }
            },
            notes: {
              type: 'textarea',
              label: ' ',
              attrs: {
                placeholder: "Comments"
              }
            }
          }
        }
      }
    };

    return [Page1, Page2]
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