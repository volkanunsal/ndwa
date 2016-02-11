import React from 'react';
import AppFlux from '../app';
import FluxComponent from 'flummox/component';
import Nav from 'components/Nav';
var basePath = '/';


export default class SectionPage extends React.Component {
  componentDidMount(){
    if (__PRERELEASE__) {
      window.onbeforeunload = function() {
        return 'For this BETA version, closing this tab means you will lose the information you typed in.';
      }

      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','//connect.facebook.net/en_US/fbevents.js');

      fbq('init', '788408467948972');
      fbq('track', "PageView");
    };
  }

  render() {
    let num = this.props.params.sectionName;
    if (num.split('')[-1] !== 0 && num.split('').length == 1) {
      num = "0" + num;
    };
    let Section = require('../components/Section' + num);

    return <div>
      <nav className='navbar navbar-default hidden-print'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <a href={basePath} className='navbar-brand'>
              <img src={require('../images/greylogo.png')} style={{width:270, marginRight: 10, position: 'relative', top: -13}} alt='In-house agreements' className='pull-left'/>
            </a>

          </div>
          <div className='navbar-right' style={{padding: '15px 20px 5px'}}>
            <span className='font-family: Muli'>
              Questions about your nanny contract? Call HomePay experts at 888-273-3356
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