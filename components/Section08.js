import React from 'react';
import t from 'tcomb-form';
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


  getPageOptions(contract, flux){
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
              label: <p className='lead'>{"Will the employee disclose any and all private information obtained about the employer during the course of employment, including but not limited to medical, financial, legal, and career information?"}</p>,
              template: function(locals){
                return <div>
                  <YesNo flux={flux} {...locals}/>
                </div>
              }
            },
            family_pics_sharing_permitted: {
              label: <p className='lead'>{"Will the employee share pictures of the employer, their home or children on social media networks or with the employee's friends and family?"}</p>,
              template: function(locals){
                return <div>
                  <YesNo flux={flux} {...locals}/>
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
              label: <p className='lead'>{"Will the employer restrict or interfere with the employee's means of private communications?"}</p>,
              template: function(locals){
                return <div>
                  <YesNo flux={flux} {...locals}/>
                </div>
              }
            },
            surveillance: {
              label: <p className='lead'>{"Will the employer employ surveillance technology to monitor the employee?"}</p>,
              template: function(locals){
                return <div>
                  <YesNo flux={flux} {...locals}/>
                </div>
              }
            },
            take_away_personal_docs: {
              label: <p className='lead'>{"Will the employer take the employee's documents or personal effects, without the employee's permission?"}</p>,
              template: function(locals){
                return <div>
                  <YesNo flux={flux} {...locals}/>
                </div>
              }
            },
            force_service: {
              label: <p className='lead'>{"Will the employer engage in conduct that constitutes forced services?"}</p>,
              template: function(locals){
                return <div>
                  <YesNo flux={flux} {...locals}/>
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
      <ActionBar handleSave={this.save.bind(this, this.props.calendar)}/>
    </div>
  }
}