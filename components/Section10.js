import React from 'react';
import t from 'tcomb-form';

export default class SectionPage extends React.Component {
  validateForm() {
    // Validate the entire contract
    let {contract, flux} = this.props;
    // FormStore.validate(contract, form.sections);
    flux.getActions('contract_actions').validateSections(contract)
    // TODO: open the payment modal

  }

  render() {
    let {form} = this.props;

    return <div className='container text-center' style={{alignSelf: 'center'}}>
      <h3>Congratulations, you did it! You’ve reached the end of the agreement. Be sure to review your information by using the tabs before printing it, making multiple copies and signing it!</h3>
      <p>
        <a
          onClick={this.validateForm.bind(this)}
          className='btn btn-lg btn-primary'
          style={{marginTop: 20, width: 200}}>Print</a>

      </p>
    </div>
  }
}