import React from 'react';
import { Link, State } from 'react-router';
import cx from 'classnames';

class NavTab extends React.Component {
  render(){
    var isActive = this.context.router.isActive(this.props.to, this.props.params, this.props.query) || this.props.active;
    var className = isActive ? 'active' : '';
    var link = (
        <Link {...this.props} />
    );
    return <li className={className}>{link}</li>;
  }
}
NavTab.contextTypes = {router: React.PropTypes.func};


class SecondaryNav extends React.Component {
  render(){
    return <ul className='nav nav-pills'>
      <NavTab to='page' params={{sectionName: 1, pageName: 1}}>Parties</NavTab>
      <NavTab to='page' params={{sectionName: 1, pageName: 2}}>Location</NavTab>
    </ul>
  }
}
export default class Nav extends React.Component {
  render(){
    var sections = [
      {pages: ['About you', 'Parties', 'Location'], name: 'Getting Started'},
      {pages: ['Job Description', 'Additional Tasks'], name: 'Responsibilities'},
      {pages: [], name: 'Scheduling'},
      {pages: ['Pay Rate', 'Time Off', 'Cancellations', 'Room', 'Board'], name: 'Compensation & Provisions'},
      {pages: [], name: 'Insurance'},
      {pages: [], name: 'Deductions'},
      {pages: [], name: 'Evaluation'},
      {pages: ['Worker', 'Family'], name: 'Privacy & Confidentiality'},
      {pages: ['Severance & Lodging', 'Immediate Termination'], name: 'Termination'},
      {pages: [], name: 'Finish'}
    ];

    var primary = [];
    for (var i = 0; i < sections.length; i++) {
      let sid = i+1;
      primary.push(<NavTab to='section' params={{sectionName: sid}} key={i}>{sections[i].name}</NavTab>);
    };

    var secondary = [];
    var sname = this.props.params.sectionName;
    var pname = this.props.params.pageName;
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
        secondary.push(<NavTab
          to='page'
          active={isActive}
          params={{sectionName: sid, pageName: pid}}
          key={j}>
            {pages[j]}
          </NavTab>);
      };
    };

    return <div>
      <ul className='nav nav-tabs'>
        {primary}
      </ul>
      <ul className='nav nav-pills'>
        {secondary}
      </ul>
    </div>
  }
}