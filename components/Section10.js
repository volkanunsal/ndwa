import React from 'react';
import t from 'tcomb-form';
import ContractStore from '../stores/ContractStore';

export default class SectionPage extends React.Component {
  validateContract() {
    // Validate the entire contract
    let {contract, nav} = this.props;

    ContractStore.validate(contract, nav.sections);

    // TODO: open the payment modal

  }

  render() {

    return <div className='container text-center' style={{alignSelf: 'center'}}>
      <h3>Congratulations, you did it! You’ve reached the end of the agreement. Be sure to review your information by using the tabs before printing it, making multiple copies and signing it!</h3>
      <p>
        <a
          onClick={this.validateContract.bind(this)}
          className='btn btn-lg btn-primary'
          style={{marginTop: 20, width: 200}}>Print</a>

      </p>
    </div>
  }
}