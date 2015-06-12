import React from 'react';
import cx from 'classnames';

export default class YesNo extends React.Component {
  handleYesClick(){
    let {path, value, flux} = this.props;
    flux.getActions('contract_actions').setIn(path, true)
  }
  handleNoClick(){
    let {path, value, flux} = this.props;
    flux.getActions('contract_actions').setIn(path, false)
  }
  render(){
    let {value, hasError, label, attrs, config, path} = this.props;

    let cs = {
      'has-error': hasError,
      'form-group':true
    };
    cs['form-group-depth-'+path.length] = true;
    cs = cx(cs)

    let yesClasses = cx({
      'btn': true,
      'btn-yesno': value == true,
      'btn-link': value == false
    })
    let noClasses = cx({
      'btn': true,
      'btn-yesno': value == false,
      'btn-link': value == true
    })

    let col1Cs = {
      'control-label': true
    }
    let col2Cs = {
    }


    if (config.horizontal) {
      let {horizontal} = config;
      for(let key in horizontal){
        let col1 = horizontal[key][0];
        let col2 = horizontal[key][1];
        col1Cs[`col-${key}-${col1}`] = true;
        col2Cs[`col-${key}-${col2}`] = true;
      }
    };

    return <div className={cs}>
      <label className={cx(col1Cs)}>
        {label}
      </label>
      <div className={cx(col2Cs)}>
        <ul className='list-inline btn-group-yesno'>
          <li>
            <a className={yesClasses}
              onClick={this.handleYesClick.bind(this)}>Yes</a>
          </li>
          <li>
            <a className={noClasses}
              onClick={this.handleNoClick.bind(this)}>No</a>
          </li>
        </ul>
        <input type='hidden' name={attrs.name} />
      </div>
    </div>
  }
}