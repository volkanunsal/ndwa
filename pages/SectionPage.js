import React from 'react';
import AppFlux from '../app';
import FluxComponent from 'flummox/component';
import Nav from 'components/Nav';

export default class SectionPage extends React.Component {
  
  render() {
    let num = this.props.params.sectionName;
    if (num.split('')[-1] !== 0 && num.split('').length == 1) {
      num = "0" + num;
    };
    var Section = require('../components/Section' + num);
    return <div>
      <FluxComponent
        connectToStores={{
          form: store => ({ form: store.state }),
          contract: store => ({ contract: store.state })
        }} {...this.props}>
        <Nav {...this.props}/>
        <Section/>
      </FluxComponent>
    </div>;
  }
}