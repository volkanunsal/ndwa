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
      <p>Heat that works: YES/NO. Explain: ___________________________</p>
      <p>Heat controlled by employee: YES/NO. Explain: ___________________________</p>
      <p>Room free of dust, bugs, mold: YES/NO. Explain: ___________________________</p>
      <p>Room free of any other hazard: YES/NO. Explain: ___________________________</p>
      <p>The employer may enter the employee’s living space ONLY under the following agreed-upon circumstances:</p>

      <ul>
        <li>With notice of ___ (# days/hours/months) if possible and if not possible letting the employee know as soon as reasonably possible.</li>
        <li>In cases of emergencies or repairs.</li>
        <li>At the employee’s request for repairs.</li>
      </ul>


      Is the employer offering food and meals to employee? YES/NO
      If YES:
      a. Employee may eat/drink household foods or beverages. YES/NO
      b. The food/beverages are provided free of charge. YES/NO
      If Employee may not use household food, the Employee:
      (1) May bring his/her own food to work. YES/NO
      (2) Will be given enough time during meal break to find food and eat his/her meal outside the household. YES/NO
      (3) Employee and Employer have agreed that employee will pay for food. YES/NO
      (4) Food and other things provided by the Employer are noted below:
      ______________________________________________________________________________
      ______________________________________________________________________________
      ______________________________________________________________________________


      BENEFITS/INSURANCE
      17. The Employer offers the Employee the following insurance benefits per year:
      a) Paid Health insurance. YES/NO
      Plan provided is: _______________________________________
      b) Transportation costs (exclusive of mileage/car use for on-the-job related tasks). YES/NO
      Amount: _______________________
      (1) Further details (i.e., if certain benefits are not paid, not paid in full, etc., or additional benefits):
      ___________________________________________________________________________
      ___________________________________________________________________________

      18. The employer’s workers compensation company and information are as follows:

      INSURANCE COMPANY: _______________________________________
      INSURANCE POLICY: _______________________________________
      CONTACT INFORMATION:_______________________________________


      DEDUCTIONS
      19. Wage Deductions: Employer may make the following deductions from Employee’s wages:
       State Income Tax: $____ per (paycheck, month, etc.) 
      Federal Income Tax: $____ per (paycheck, month, etc.) 
      Employer Provided Health Insurance: $ per (paycheck, month, etc.) 
      Food and beverages: $ per (paycheck, month, etc.)
      Lodging: $ per (paycheck, month, etc.) 
      Other (specify the purpose, frequency, and amount of the deductions): ____________________________________________________________________ 


      EVALUATIONS/REVIEWS
      20. After three months, Employer (will/will not) give Employee a written job evaluation,
      and (will/will not) provide an evaluation every (year, 3 months, or ________). This agreement will be reviewed every ______ (#) months/years. During these reviews, both parties will have the opportunity to evaluate the agreement and propose changes.

      21. Employer and Employee shall establish a fair process for settling complaints and
      increasing pay and benefits, giving due process to both parties. That process is described below:
      ______________________________________________________________________________
      ______________________________________________________________________________
      ______________________________________________________________________________
      ______________________________________________________________________________
      ______________________________________________________________________________


      CONFIDENTIALITY AND PRIVACY
      22. Employee will not disclose any and all private information obtained about the Employer during the course of employment, including but not limited to medical, financial, legal, and career information. YES/NO
      23. Employee understands that the Employer has expressed that no pictures of the children should be shared on any social media network or with strangers to the Employer. YES/NO
        a.  Additional provisions: ______________________________________________________________________________
      ______________________________________________________________________________


      24. Employer will not restrict or interfere with Employee’s means of private communications will not monitor Employee’s private communications. YES/NO

      25. Employer will not take Employee’s documents or personal effects, and will not engage in conduct that constitutes forced services. YES/NO

      26. Employer will respect Employee’s right to privacy and will not use any surveillance technology without informing her/him. YES/NO
        a.  Additional provisions: ______________________________________________________________________________
      ______________________________________________________________________________



      JOB TERMINATION
      SEVERANCE AND LODGING
      27. The Employer and Employee agree that if either party chooses to end the employment, both the Employer and Employee will give each other ______ (days/weeks) notice. Employer will provide Employee with _____ days of severance upon termination.
      a.  If the Employer asks the Employee to leave before the notice period is up, the Employee will be paid for those weeks. YES/NO
      b.  If living accommodations have been provided to Employee, _____ days of lodging will be provided to Employee if Employee is terminated.

      IMMEDIATE TERMINATION
      28. There may be cases when there are grounds or cause for immediate termination without notice (which the employer and Employee hopes will never happen). The Employer and Employee should discuss (and be as concrete as possible) what these grounds or cause for immediate termination without notice will be, and list them here:

      _________________________________________________________________________________
      _________________________________________________________________________________


      ADDITIONAL COMMITMENTS/PROVISIONS, IF WANTED BY BOTH PARTIES

      ____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________






      Signed freely, without pressure, and with good understanding of the terms of this agreement:

      ____________________________________________  _____________________
      Employer: Sign AND print          Date

      ____________________________________________  _____________________
      Employer: Sign AND print          Date

      ____________________________________________  _____________________
      Employee: Sign AND print          Date


      APPENDIX 1

      If the Employee voluntarily agrees to work on a scheduled day off, this agreement must be in writing and s/he must be paid at time-and-a-half for hours worked during this period.

      I, _____________________ (Employee), agree to work on _________ (date) for ________ (amount of time) and I, ________ (Employer), agree to pay time and a half for hours worked.

      Initialed:_____ (Employee)    Initialed: _____ (Employee)     Date: ____________


      <h1>APPENDIX 2</h1>

      If the Employee must be on duty for 24 consecutive hours or more:
      The Employer and Employee may make a prior written agreement to exclude from pay a regularly scheduled sleeping period of 8 hours or less for each 24-hour period.

      I, _____________________ (Employee), knowing I am working 24 consecutive hours, agree that
      ____ hours (up to 8 hours ) will be unpaid paid time provided that I am given undisturbed and
      uninterrupted sleeping time.

      Initialed: _____ (Employee)     Initialed: _____ (Employer)     Date: ______________

    </div>


    let fixErrors = <div>
      <h3>{"Ooops! There were some errors in the form. Please go back to the highlighted sections and complete them before proceeding."}</h3>
    </div>

    return <div className='container text-center' style={{alignSelf: 'center'}}>
      {(isValid != undefined && isValid) ? printPage : endResult}
    </div>
  }
}