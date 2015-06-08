import React from 'react';
import { Link, State } from 'react-router';
import cx from 'classnames';

class NavTab extends React.Component {
  render(){
    var active = this.context.router.isActive(this.props.to, this.props.params, this.props.query) || this.props.active;
    let valid = this.props.valid && this.props.validated;
    let invalid = !this.props.valid && this.props.validated;

    var liClass = cx({
      active,
      valid,
      invalid
    });

    var link = (
        <Link {...this.props} />
    );
    return <li className={liClass}>{link}</li>;
  }
}
NavTab.contextTypes = {router: React.PropTypes.func};


export default class Nav extends React.Component {
  render(){
    var {sections} = this.props.form;
    var sname = this.props.params.sectionName;
    var pname = this.props.params.pageName;

    var primary = [];
    if (sname) {
      for (var i = 0; i < sections.length; i++) {
        let sid = i+1;
        let priNavParams = {sectionName: sid};
        // TODO: ensure the nav item looks disabled when the link is not authorized according to the policy
        let section = sections[i];
        primary.push(<NavTab
          to='section'
          params={priNavParams}
          valid={section.valid}
          validated={section.validated}
          key={i}>
            {section.name}
          </NavTab>);
      };
    };

    var secondary = [];
    if (sname) {
      let sid = Number(sname);
      let pages = sections[sid-1].pages;

      for (var j = 0; j < pages.length; j++) {
        let pid = j+1;
        let isActive = false;

        // If the pageName is blank, make the first submenu item active.
        if (j == 0 && !pname) {
          isActive = true;
        };

        let secNavParam = {sectionName: sid, pageName: pid};
        let page = pages[j];
        let {name} = page;

        if (name) {
          secondary.push(<NavTab
            to='page'
            active={isActive}
            className='btn-sm'
            params={secNavParam}
            valid={page.valid}
            validated={page.validated}
            key={j}>
              {name}
            </NavTab>);
        };
      };
    };

    return <div className='form-nav'>
      <ul className='primary nav nav-tabs'>
        {primary}
      </ul>
      <ul className='secondary nav nav-pills'>
        {secondary}
      </ul>
    </div>
  }
}