import React from 'react';

export default class HomePage extends React.Component {
  render() {
    return <div>
      <div className='jumbotron' style={{minHeight: 400, display: 'flex', justifyContent: 'center'}}>
        <div className='container' style={{alignSelf: 'center'}}>
          <h1>National Domestic Workers Alliance</h1>
        </div>
      </div>
    </div>;
  }
}