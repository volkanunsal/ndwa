import React from 'react';
import HomePage from './pages/HomePage';
require('bootstrap-sass!./config/bootstrap-sass.config.js');
import router from './router';

router.run((Handler, state)=>{
  React.initializeTouchEvents(true);
  React.render(<Handler {...state} />, document.getElementById('root'));
})



