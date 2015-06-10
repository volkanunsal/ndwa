import React from 'react';
import {Link} from 'react-router';

export default class NotFoundPage extends React.Component {
  render() {
    return <div className='bg-brand-black' style={{color: 'white', minHeight: 800, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 text-right'>
            <img src={require('../images/404.png')} align='left'/>
          </div>
          <div className='col-lg-6'>
            <p style={{fontSize: '4em'}}>Oops, looks like we
                  missed the mark.</p>
            <Link to='home' className='btn btn-link btn-lg btn-custom' style={{marginTop: 80, marginBottom: 80}}>
              Home
            </Link>
          </div>
        </div>
      </div>

    </div>
  }
}