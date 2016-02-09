import React from 'react';
import Tabletop from '../lib/tabletop';

let phoneNumVisible = false;
export default class ActionBar extends React.Component {

  showInfo(cells, tt) {
    let _phoneNumVisible = cells.reduce((sum, a) => (a.footer_phone_num === 'TRUE') && sum, true);

    if (_phoneNumVisible !== phoneNumVisible) {
      phoneNumVisible = _phoneNumVisible;
      this.forceUpdate();
    }

    // let showPhoneSessionVar = sessionStorage.getItem('show_phone');
    // let showPhoneThisSession;
    // if (showPhoneSessionVar) {
    //   showPhoneThisSession = showPhoneSessionVar === 'true';
    // }
    // if (showPhoneSessionVar && showPhoneThisSession !== phoneNumVisible) {
    //   phoneNumVisible = showPhoneThisSession;
    //   this.forceUpdate();
    // }

  }

  componentDidMount() {
    sessionStorage.setItem('show_phone', this.props.query.show_phone);

    Tabletop.init({key: 'https://docs.google.com/spreadsheets/d/1ZNsQFNMNDl8j6PTvkldCI7QBHvDroGqNsppjGJQvccU/pubhtml',
                     callback: ::this.showInfo,
                     simpleSheet: true})
  }
  render(){
    console.log(phoneNumVisible);
    return <div className='navbar navbar-default navbar-fixed-bottom action-bar'>
      <div className='container-fluid'>
        <a href='http://www.faircarelabs.org/' target='_blank' className='pull-left'>
          <img src={require('../images/greyfcl.png')} style={{height: 50}}/>
        </a>
        {phoneNumVisible ? <span className='pull-left'>
          <div  style={{display: 'flex', alignItems: 'center', height: 50, paddingLeft: 10}}>
            <span>Questions? Please call 888-273-3356</span>
          </div>
        </span> : null}
        <a className='btn btn-yesno navbar-btn pull-right' onClick={this.props.onSave}>CONTINUE</a>
      </div>
    </div>
  }
}
