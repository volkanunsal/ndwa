import React from 'react';
import t from 'tcomb-form';

export default class SectionPage extends React.Component {
  save() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();

    // if validation fails, value will be null
    if (value) {
      // TODO: open the payment modal
      console.log(value);
    }
  }

  render() {
    return <div className='container text-center' style={{alignSelf: 'center'}}>
      <h3>Congratulations, you did it! You’ve reached the end of the agreement. Be sure to review your information by using the tabs before printing it, making multiple copies and signing it!</h3>
      <p>
        <a className='btn btn-lg btn-primary' style={{marginTop: 20, width: 200}}>Print</a>
      </p>
    </div>
  }
}