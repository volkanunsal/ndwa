import React from 'react';
import AppFlux from '../app';
import FluxComponent from 'flummox/component';
import Nav from 'components/Nav';
var basePath = __PRERELEASE__ ? '/ndwa' : '/';


export default class SectionPage extends React.Component {

  render() {
    let num = this.props.params.sectionName;
    if (num.split('')[-1] !== 0 && num.split('').length == 1) {
      num = "0" + num;
    };
    var Section = require('../components/Section' + num);
    return <div>
      <nav className='navbar navbar-default hidden-print'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <a href={basePath} className='navbar-brand'>
              <img src={require('../images/logo.png')} style={{height:20, marginRight: 10}} alt='In-house agreements' className='pull-left'/>
              <span className='pull-left'>In-house agreements</span>
            </a>
          </div>
        </div>
      </nav>
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