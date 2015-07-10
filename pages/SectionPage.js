import React from 'react';
import AppFlux from '../app';
import FluxComponent from 'flummox/component';
import Nav from 'components/Nav';
var basePath = '/';


export default class SectionPage extends React.Component {
  componentDidMount(){
    if (__PRERELEASE__) {
      window.onbeforeunload = function() {
        return 'You have unsaved changes!';
      }
    };
  }

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
              <img src={require('../images/greylogo.png')} style={{width:270, marginRight: 10, position: 'relative', top: -13}} alt='In-house agreements' className='pull-left'/>
            </a>

          </div>
          <div className='navbar-right' style={{padding: '15px 20px 5px'}}>
            <span >
              Beta
            </span>
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