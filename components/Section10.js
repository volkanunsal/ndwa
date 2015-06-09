import React from 'react';
import t from 'tcomb-form';


export default class SectionPage extends React.Component {
  printForm() {

  }

  render() {
    let {form} = this.props;
    let isValid = form.sections.reduce((prev, cur)=> prev && cur.validated && cur.valid, true)

    let printPage = <div>
      <h3>Congratulations, you did it! You’ve reached the end of the agreement. Be sure to review your information by using the tabs before printing it, making multiple copies and signing it!</h3>


      <p>
        <a
          onClick={this.printForm.bind(this)}
          className='btn btn-lg btn-primary'
          style={{marginTop: 20, width: 200}}>Print</a>

      </p>
    </div>

    let endResult = <div>
      <h1>Model Domestic Employer/Employee Agreement</h1>
      <p>This agreement is between:</p>
      , hereinafter “Employee” and , hereinafter “Employer.”
      <p>The work will be done at:  .</p>
      <p>This agreement will begin on . </p>
      <h2>Work Responsibilities</h2>
      <h3>Childcare and nanny services</h3>
      <h3>. Home/Elder care, including sick, convalescing, and elderly individuals </h3>
      <h3>House Cleaning and Home Management</h3>

      <h3>Additional tasks</h3>

      <p>The hours of employment will be the following:</p>

      <p>Total weekly hours .</p>

      <p>The employer will pay the employee $_____ per hour and the employee will be paid on _______ (day) on a ________ (weekly/biweekly) basis.</p>

      <p>The employee will be paid a rate $____ per hour for overtime hours (any hour worked over 40 hours per week).</p>

      <p>The employer will attempt to provide the employee with _______ day(s) notice, in advance of requesting overtime hours when feasible, for days not otherwise specified herein.</p>

      <ol>
        <li>{"If the Employee voluntarily agrees to work on a scheduled day off, this agreement must be in writing and s/he must be paid at time-and-a-half for hours worked during this period. The written agreement shall be attached to this agreement or is set out in the Appendix."}</li>
        <li>{"If the Employee must be on duty for 24 consecutive hours or more, the Employer and Employee may make a prior written agreement to exclude from pay a regularly scheduled sleeping period of 8 hours or less for each 24-hour period. The written agreement shall be attached to this agreement or is set out in the Appendix."}</li>
      </ol>

      <p>The employee will be given paid vacation days.</p>
      <p>The employee will be given paid personal/sick days.</p>
      <p>The employee will be paid for the following Holidays:</p>
      <p>If Employee requests parental leave for the birth or adoption of a child, Employee will provide _____ days/weeks notice prior to taking the requested leave.</p>
      <p>The Employer will pay Employee for Parental Leave.</p>
      <p>{"In the event the employer temporarily reduces the employee's hours the employer guarantees to continue to pay the employee her regular wages."}</p>
      <p>{"If the Employer has to cancel one or more days of the Employee's workweek, s/he can expect to be paid as usual."}</p>
      <p>{"The Employer expects that the Employee will make every effort to come to work during bad weather.  When a city or region is shutdown because of poor weather conditions, the Employer will pay the Employee for days of missed work."}</p>

      <p>Is the employee required to live with the employer?</p>

      <p>The living space for the employee provided by the employer is as follows (detailed description):</p>

      <p>Size of room: ________________________</p>
      <p>Number of beds in the room: ___________________________</p>
      <p>Number of people living in the room besides employee of this agreement: _______</p>
      <p>Heat that works: . Explain: ___________________________</p>
      <p>Heat controlled by employee: . Explain: ___________________________</p>
      <p>Room free of dust, bugs, mold: . Explain: ___________________________</p>
      <p>Room free of any other hazard: . Explain: ___________________________</p>
      <p>The employer may enter the employee’s living space ONLY under the following agreed-upon circumstances:</p>

      <ul>
        <li>With notice of ___ (# days/hours/months) if possible and if not possible letting the employee know as soon as reasonably possible.</li>
        <li>In cases of emergencies or repairs.</li>
        <li>At the employee’s request for repairs.</li>
      </ul>

      <p>Is the employer offering food and meals to employee?</p>

      <ul>
        <li>Employee may eat/drink household foods or beverages. </li>
        <li>The food/beverages are provided free of charge.</li>
      </ul>

      <p>If Employee may not use household food, the Employee:</p>

      <ul>
        <li>May bring his/her own food to work.</li>
        <li>Will be given enough time during meal break to find food and eat his/her meal outside the household.</li>
        <li>Employee and Employer have agreed that employee will pay for food.</li>
      </ul>

      <p>Food and other things provided by the Employer are noted below:</p>


      <h2>BENEFITS/INSURANCE</h2>

      <p>The Employer offers the Employee the following insurance benefits per year:</p>

      <p>Paid Health insurance.</p>
      <p>Plan provided is:</p>
      <p>Transportation costs (exclusive of mileage/car use for on-the-job related tasks).</p>
      <p>Amount:</p>

      <p>The employer’s workers compensation company and information are as follows:</p>
      <ul>
        <li>INSURANCE COMPANY: _______________________________________</li>
        <li>INSURANCE POLICY: _______________________________________</li>
        <li>CONTACT INFORMATION:_______________________________________</li>
      </ul>
      
      <h2>JOB TERMINATION</h2>

      <h3>SEVERANCE AND LODGING</h3>

      <p>The Employer and Employee agree that if either party chooses to end the employment, both the Employer and Employee will give each other ______ (days/weeks) notice. Employer will provide Employee with _____ days of severance upon termination.</p>

      <ul>
        <li>If the Employer asks the Employee to leave before the notice period is up, the Employee will be paid for those weeks.</li>
        <li>If living accommodations have been provided to Employee, _____ days of lodging will be provided to Employee if Employee is terminated.</li>
      </ul>

      <h3>IMMEDIATE TERMINATION</h3>
      <p>There may be cases when there are grounds or cause for immediate termination without notice (which the employer and Employee hopes will never happen). The Employer and Employee should discuss (and be as concrete as possible) what these grounds or cause for immediate termination without notice will be, and list them here:</p>


      <p>Signed freely, without pressure, and with good understanding of the terms of this agreement:</p>


      <table>
        <tbody>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Employer: Sign AND print</td>
            <td>Date</td>
          </tr>
          <tr>
            <td>Employer: Sign AND print</td>
            <td>Date</td>
          </tr>
          <tr>
            <td>Employee: Sign AND print</td>
            <td>Date</td>
          </tr>
        </tbody>
      </table>

    </div>


    let fixErrors = <div>
      <h3>{"Ooops! There were some errors in the form. Please go back to the highlighted sections and complete them before proceeding."}</h3>
    </div>

    return <div className='container text-center' style={{alignSelf: 'center'}}>
      {(isValid != undefined && isValid) ? printPage : endResult}
    </div>
  }
}