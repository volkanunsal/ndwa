import React from 'react';
import t from 'tcomb-form';
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');
import ActionBar from './ActionBar';
import decorators from '../utils/decorators';
import {MyModal, TipTrigger} from '../components/MyModal';


@decorators.getForm
export default class SectionPage extends React.Component {

  getPageOptions(contract, flux){
    var Page1 = {
      label: 'Are you a domestic worker or an employer?',
      fields: {
        user_type: {
          label: ' ',
          factory: t.form.Radio
        }
      },
      template: function(locals){
        return <div className='text-center'>
          <p className='lead'>{locals.label}</p>
          <div className='form-inline q-domestic-or-employer'>
            {React.addons.createFragment(locals.inputs)}
            <ul className='list-inline'>
              <li>
                <TipTrigger anchorText='1' modalContent={<div>
                  <p>You are a 'domestic worker' if:</p>
                  <ol>
                    <li>you are an independent contractor or an employee.</li>
                    <li>who has been or will be hired, paid, or permitted to perform work of a domestic nature.</li>
                    <li>within a household, and </li>
                    <li>you work or will work more than 16 hours a week.</li>
                  </ol>
                  <p>If this sounds like you, please:</p>
                  <ul>
                    <li>Send this contract to your employer, or</li>
                    <li>Fill out this contract</li>
                  </ul>
                </div>}/>
              </li>
              <li>
                <TipTrigger anchorText='2' modalContent={<div>
                  <p>You are a "domestic employer" if:</p>
                  <ol>
                    <li>an independent contractor or an employee works for you,</li>
                    <li>whom you have hired or intend to hire, pay, or permit to perform work of a domestic nature,</li>
                    <li>within a household, and</li>
                    <li>who works or will work more than 16 hours a week.</li>
                  </ol>

                  <p>This definition specifically excludes employers who:</p>
                  <ol>
                    <li>are considered staffing, employment or placement agencies already licensed or registered under the Employment Agency Law,</li>
                    <li>any individual for whom a personal care attendant provides services under the MassHealth personal care attendant program or any successor program,</li>
                    <li>and casual babysitters.</li>
                  </ol>

                  <p>If this sounds like you, please:</p>

                  <ol>
                    <li>Fill out this contract</li>
                    <li>Share it with your peers</li>
                  </ol>

                </div>}/>
              </li>
            </ul>


          </div>
        </div>

      }
    };
    var Page2 = {
      // auto: 'placeholders',
      legend: 'This agreement is between the following parties',
      config: {
        horizontal: {
          lg: [2, 10]
        }
      },
      template: function(locals){
        return <div>
          <p className='lead'>{locals.label}</p>
          {React.addons.createFragment(locals.inputs)}
        </div>;
      }
    };
    var Page3 = {
      fields: {
        work_address: {
          label: <div>
            <p className='lead'>Where will the work take place?</p>
            <TipTrigger anchorText='3' modalContent={<div>
              <p>Employer may have multiple addresses or employee may work for a family at multiple locations.</p>
            </div>}/>
          </div>,
          help: <i>Please enter an address</i>,
          config: {
            addonBefore: <span className='fa fa-map-marker'/>
          }
        },
        start_date: {
          label: <div>
            <p className='lead'>On what date will this agreement begin?</p>
            <TipTrigger anchorText='4' modalContent={<div>
              <p>This agreement is effective upon signing, not date of original hire.</p>
            </div>}/>
          </div>
        }
      }
    };
    return [Page1, Page2, Page3]
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