import React from 'react';
import {Link} from 'react-router';

export default class SectionPage extends React.Component {
  render() {
    return <div className='jumbotron' style={{minHeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div>
        <h2>Contractlandia</h2>
        <p><Link to='section' className='btn btn-block btn-primary btn-lg' params={{sectionName: 1}}>Go go go</Link></p>
      </div>
    </div>;
  }
}