import React from 'react';
var t = require('tcomb-form');
  
export default class SectionPage extends React.Component {
  save() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();

    // if validation fails, value will be null
    if (value) {
      // value here is an instance of Person
      console.log(value);
    }
  }

  render() {
    return <div className='container' style={{alignSelf: 'center'}}>
    </div>
  }
}