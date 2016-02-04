import React from 'react';
import t from 'tcomb-form';
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');
import ActionBar from './ActionBar';
import decorators from '../utils/decorators';
import {MyModal, TipTrigger} from '../components/MyModal';


@decorators.getForm
@decorators.googleAnalytics
export default class SectionPage extends React.Component {

  componentDidMount() {
    this.sendPageViewToGA()
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
        }
      },
      template: function (locals) {
        let {
          children
          , childcare_tasks
          , cleaning_tasks
        } = locals.inputs;

        return <div className='row'>
          <div className='col-lg-12'>
            {locals.label}
          </div>
          <div className='col-lg-12'>
            <h4><TipTrigger anchorText='5' modalContent={<div>
              <p>Employment within your household involving child care that exceeds 16 hours per week, on a regular recurring basis. Example: a full or part time nanny.</p>
            </div>}/> Childcare & Nanny Services
            </h4>
            {children}
            {childcare_tasks}
          </div>
          <div className='col-lg-12'>
            <h4><TipTrigger anchorText='6' modalContent={<div>
              <p>Employment within your household involving house cleaners and/or cooks that exceeds 16 hours per week, on a regular recurring basis.</p>
            </div>}/> House Cleaning & Home Management
            </h4>
            {cleaning_tasks}
          </div>
        </div>
      }
    };
    var Page2 = {
      fields: {
        additional_tasks: {
          label: <div>
            <p className='lead'><TipTrigger anchorText='8' modalContent={<div>
              <p>Be sure to complete/fill in this sample agreement to fit your own situation, and be as specific as possible. Include and identify any and all tasks/responsibilities that both parties have agreed the employee will perform during the course of employment.</p>
            </div>}/> Are there additional responsibilities? (Please elaborate.)</p> </div>,
          type: 'textarea'
        }
      }
    };
    return [Page1, Page2]
  }

  render() {
    return <div className='form-section'>
      <div className='container-fluid'>
        {this.getForm()}
      </div>
      <ActionBar {...this.props} onSave={this.save.bind(this)}/>
    </div>
  }
}