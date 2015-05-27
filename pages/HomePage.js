import React from 'react';
import AppFlux from '../app';
import FluxComponent from 'flummox/component';
var t = require('tcomb-form');
// var jsPDF = require('../jspdf');

var Gender = t.enums({
  M: 'Male',
  F: 'Female'
});


var Country = t.enums({
  US: 'United States',
  IT: 'Italy'
});

var Animal = t.enums({
 dog: "Dog",
 cat: "Cat"
});

var Pet = t.struct({
  name: t.Str,
  type: Animal
});


var Person = t.struct({
  fullName: t.Str,
  nickname: t.maybe(t.Str),
  gender: Gender,
  country: Country,
  tags: t.list(t.Str),
  pets: t.list(Pet),
});


var petLayout = function(locals){
  return (
    <div>
      <p>petLayout</p>
      <div>{locals.inputs.name}</div>
      <div>{locals.inputs.type}</div>
    </div>
  );
};

var options = {
  fields: {
    gender: {
      label: <i>My label</i>,
      factory: t.form.Radio
    },
    pets: {
      item: {
        template: petLayout
      }
    },
    fullName: {
      label: <i>Full Name</i>,
      config: {
        addonBefore: React.DOM.i({}, 'before')
      }
    }
  }
};

var value = {
  pets: [
    {name: 'pet1', type: 'dog'},
    {name: 'pet2', type: 'cat'}
  ]
};

var Form = t.form.Form;

class InnerComponent extends React.Component {

  save() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();

    // if validation fails, value will be null
    if (value) {
      // value here is an instance of Person
      console.log(value);
    }
  }

  render(){
    return <div>
      <div className='container' style={{alignSelf: 'center'}}>
        <Form ref="form" type={Person} options={options} value={value} />
        <button onClick={this.save.bind(this)}>Save</button>
      </div>
    </div>
  }
}
export default class HomePage extends React.Component {

  render() {
    return <div>
      <div className='jumbotron' style={{minHeight: 400, display: 'flex', justifyContent: 'center'}}>
        <FluxComponent flux={this.props.flux} connectToStores={{
              employee: store => ({ employee: store.state }),
              employer: store => ({ employer: store.state }),
            }}>
          <InnerComponent/>
        </FluxComponent>
      </div>
    </div>;
  }
}