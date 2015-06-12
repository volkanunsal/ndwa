import React from 'react';

export default class EmailSignUp extends React.Component {
  render(){
    return <form action="//faircarelabs.us10.list-manage.com/subscribe/post?u=f3b783ea318f65caedd6046b9&amp;id=d5910f0380" method="post" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate id='signup-form'>
        <input type='text' name="NAME" style={{border: 'solid 2px white'}} className='form-control input-lg' placeholder='Name'/>
        <input type="email" style={{border: 'solid 2px white'}} className='form-control input-lg' name="EMAIL" placeholder='Email Address'/>
        <button type="submit" name="subscribe" className='btn btn-link'>
          <img src={require('../images/circle_check.png')}/>
        </button>
        <div style={{position: 'absolute', left: -5000}}>
          <input type="text" name="b_f3b783ea318f65caedd6046b9_d5910f0380" tabIndex={-1} value="" />
        </div>
    </form>


  }
}