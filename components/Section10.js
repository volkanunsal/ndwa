import React from 'react';
import t from 'tcomb-form';
import moment from 'moment';
import Contract from './Contract';
  
export default class SectionPage extends React.Component {
  printForm() {
    window.print()
  }
  render() {
    let {form} = this.props;
    let isValid = form.sections.reduce((prev, cur)=> prev && cur.validated && cur.valid, true)

    let {contract} = this.props;

    let printPage = <div>
      <div className='text-center hidden-print'>
        <h3>Congratulations, you did it! You’ve reached the end of the agreement. Be sure to review your information by using the tabs before printing it, making multiple copies and signing it!</h3>
        <p>
          <a
            onClick={this.printForm.bind(this)}
            className='btn btn-lg btn-primary'
            style={{marginTop: 20, width: 200}}>Print</a>
        </p>
      </div>
      <Contract {...contract} />
    </div>
    let fixErrors = <div>
      <h3>{"Ooops! There were some errors in the form. Please go back to the highlighted sections and complete them before proceeding."}</h3>
    </div>
    return <div className='container' style={{alignSelf: 'center'}}>
      {(isValid != undefined && isValid) ? printPage : printPage}
    </div>
  }
}