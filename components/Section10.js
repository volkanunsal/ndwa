import React from 'react';
import t from 'tcomb-form';
import moment from 'moment';

export default class SectionPage extends React.Component {
  printForm() {
    window.print()
  }

  render() {
    let {form} = this.props;
    let isValid = form.sections.reduce((prev, cur)=> prev && cur.validated && cur.valid, true)

    let {contract} = this.props;

    let employee_name = contract.employee && contract.employee.name;
    let employer_name = contract.employer && contract.employer.name;
    let {children}              = contract;
    let {home_care_recipients}  = contract;
    let {cleaning_tasks}        = contract;
    let {additional_tasks}      = contract;
    let {valid_work_schedule}   = contract;
    let {work_days}             = contract;
    let {parental_leave}        = contract;
    let {overtime_holidays}     = contract;
    let {room}                  = contract;
    let {deductions}            = contract;
    let {childcare_tasks}       = contract;
    let {home_care_tasks}       = contract;

    if (overtime_holidays) {
      let i = 0;
      for(let day in contract.overtime_holidays){
        let days = []
        if (contract.overtime_holidays[day]) {
          days.push(<li key={i++}>{day}</li>)
        };
        overtime_holidays = days
      }
    };

    let employee_room;
    if (room) {
      let {living_accommodations} = room;
      let {entry} = living_accommodations || {};

      if (living_accommodations) {
        employee_room = <div>
          <p>The living space for the employee provided by the employer is as follows:</p>
          <ul>
            <li>Size of room: {living_accommodations.size}</li>
            <li>Number of beds in the room: {living_accommodations.num_beds}</li>
            <li>Number of people living in the room besides employee of this agreement: {living_accommodations.num_people}</li>
            {living_accommodations.working_heat ? <li>Heat works</li> : <li>There is no heat</li>}
            {living_accommodations.working_heat ? <li>Heat is {living_accommodations.heat_controlled ? null : <span>NOT</span>} controlled by employee</li> : null}
            {living_accommodations.clean ? <li>Room free of dust, bugs, mold</li> : null}
          </ul>

          {entry && (entry.notice_length || entry.emergency_repairs || entry.specific_repairs || entry.other) ? <div>
              <p>The employer may enter the employee’s living space ONLY under the following agreed-upon circumstances:</p>
              <ul>
                <li>With notice of {entry && entry.notice_length} days if possible and if not possible letting the employee know as soon as reasonably possible.</li>
                {entry && entry.emergency_repairs ? <li>In cases of emergencies or repairs.</li> : null}
                {entry && entry.specific_repairs ? <li>At the employee’s request for repairs.</li> : null}
                {entry && entry.other ? <li>{entry.other}</li> : null}
              </ul>
            </div> : <p>The employer may NOT enter the employee’s living space under any circumstances.</p>}
        </div>
      };
    };

    let resp_1 = children && children.length > 0 ? <div>
      <h3>Childcare and nanny services</h3>

      <h4>Children</h4>
      {children.map(child => {
        return <p>
          <b>Name:</b> {child.name}<br/>
          <b>Age:</b> {child.age}<br/>
          <b>Description of care:</b> {child.description_of_care}
        </p>
      })}
      {childcare_tasks && childcare_tasks.length > 0 ? <div><h4>Childcare tasks</h4>
      <ul>{childcare_tasks.map(task => <li>{task}</li>)}</ul></div> : null}
    </div> : null

    let resp_2 = (home_care_recipients home_care_recipients.length > 0) ? <div>
      <h3>Home/Elder care, including sick, convalescing, and elderly individuals </h3>

      <h4>Recipient</h4>
      {home_care_recipients.map(recip => {
        return <p>
          <b>Name:</b> {recip.name}<br/>
          <b>Age:</b> {recip.age}<br/>
          <b>Description of care:</b> {recip.description_of_care}
        </p>
      })}
      {home_care_tasks && home_care_tasks.length > 0 ? <div><h4>Homecare tasks</h4>
      <ul>{home_care_tasks.map(task => <li>{task}</li>)}</ul></div> : null}
    </div> : null;

    let resp_3 = cleaning_tasks ? <div>
      <h3>House Cleaning and Home Management</h3>
      {cleaning_tasks.length > 0 ? <div><h4>Homecare tasks</h4>
      <ul>{cleaning_tasks.map(task => <li>{task}</li>)}</ul></div> : null}
    </div> : null;

    let endResult = <div className='visible-print'>
      <h1>Domestic Employer/Employee Agreement</h1>
      <p>This agreement is between {employee_name}, hereinafter 'Employee” and'{employer_name}, hereinafter 'Employer.' The work will be done at: {contract.work_address}. This agreement will begin on  {contract.start_date}.</p>

      <h2>Work Responsibilities</h2>
      {resp_1}
      {resp_2}
      {resp_3}
      {additional_tasks ? <div><h3>Additional tasks</h3> <p>{additional_tasks}</p></div> : null}

      <h2>Compensation and Provisions</h2>
      <p>The hours of employment will be the following:</p>
      <ul>
        {work_days && work_days.filter(day=> day.active).map(day => {
          return <li>{day.name}: {day.times[0]} - {day.times[1]}</li>
        })}
      </ul>

      <p>Total weekly hours {moment(contract.work_week_duration || 0).hours()}.</p>

      <p>The employer will pay the employee ${contract.hourly_rate} per hour and the employee will be paid on {contract.payday} on a {contract.payment_frequency} basis.</p>

      <p>The employee will be paid a rate ${contract.overtime_rate} per hour for overtime hours (any hour worked over 40 hours per week).</p>

      <p>The employer will attempt to provide the employee with {contract.overtime_notice} day(s) notice, in advance of requesting overtime hours when feasible, for days not otherwise specified herein.</p>
      <ol>
        <li>{"If the Employee voluntarily agrees to work on a scheduled day off, this agreement must be in writing and s/he must be paid at time-and-a-half for hours worked during this period. The written agreement shall be attached to this agreement or is set out in the Appendix."}</li>
        <li>{"If the Employee must be on duty for 24 consecutive hours or more, the Employer and Employee may make a prior written agreement to exclude from pay a regularly scheduled sleeping period of 8 hours or less for each 24-hour period. The written agreement shall be attached to this agreement or is set out in the Appendix."}</li>
      </ol>

      <h2>Time off</h2>

      <p>The employee will {contract.vacation_days && contract.vacation_days > 0 ?  null : <span>NOT</span> } be given  {contract.vacation_days && contract.vacation_days > 0 ? contract.vacation_days : null} paid vacation days.</p>

      <p>The employee will {contract.personal_days && contract.personal_days > 0 ?  null : <span>NOT</span> } be given {contract.personal_days} paid personal/sick days.</p>

      <p>The employee will be paid for the following Holidays:</p>
      {overtime_holidays}

      <p>If Employee requests parental leave for the birth or adoption of a child, Employee will provide {parental_leave.notice} days notice prior to taking the requested leave.</p>

      <p>The Employer will {parental_leave && parental_leave.paid ?  null : <span>NOT</span> } pay Employee for Parental Leave.</p>

      <h2>Cancellations</h2>
      <p>In the event the employer temporarily reduces the employee's hours the employer {contract.reduced_hours_reg_wage ? <span>guarantees</span> : <span>does NOT guarantee</span>} to continue to pay the employee her regular wages.</p>

      <p>If the Employer has to cancel one or more days of the Employee's workweek, s/he {contract.cancelled_day_paid ? <span>will</span> : <span>will NOT</span>} be paid as usual.</p>


      <p>The Employer expects that the Employee will make every effort to come to work during bad weather.  When a city or region is shutdown because of poor weather conditions, the Employer will {contract.bad_weather_day_paid ? null : <span>NOT</span>} pay the Employee for days of missed work.</p>

      <h2>Room and board</h2>
      <p>The employee is {contract.room && contract.room.provided ? null : <span>NOT</span>} required to live with the employer.</p>

      {employee_room}

      <p>The Employer will {contract.board_provided ? null : <span>NOT</span>} offer food and meals to employee</p>

      {contract.board_yes ? <ul>
        {contract.board_yes && contract.board_yes.house_food ? <li>Employee may eat/drink household foods or beverages. </li> : null}
        {contract.board_yes && contract.board_yes.free_food ? <li>The food/beverages are provided free of charge.</li> : null}
      </ul> : null}


      {contract.board_no ? <div>
        <p>The Employee:</p>
        <ul>
          {contract.board_no.bring_own_food ? <li>May bring his/her own food to work.</li> : null }
          {contract.board_no.food_paid ? <li>Employee and Employer have agreed that employee will pay for food.</li> : null }
          {contract.board_no.food_paid ? <li>Employee and Employer have agreed that employee will pay for food.</li> : null }
          {contract.board_no.food_paid_notes ? <li>{contract.board_no.food_paid_notes}</li> : null }
        </ul>
      </div> : null }

      <h2>Benefits/Insurance</h2>

      {contract.benefits && (contract.benefits.health || contract.benefits.transportation || contract.benefits.other) ? <div>
          <p>The Employer offers the Employee the following insurance benefits per year:</p>

          <ul>
            {contract.benefits && contract.benefits.health ? <li>Paid Health insurance.</li> : null}
            {contract.benefits && contract.benefits.transportation ? <li>Transportation costs (exclusive of mileage/car use for on-the-job related tasks).</li> : null}
            {contract.benefits && contract.benefits.other ? <li>{contract.benefits.other}</li> : null}
          </ul>
        </div> : <p>The Employer does not offer the Employee any insurance benefits.</p>}




      <p>The employer’s workers compensation company and information are as follows:</p>
      <ul>
        <li>INSURANCE COMPANY: {contract.workers_comp_insurance && contract.workers_comp_insurance.company}</li>
        <li>INSURANCE POLICY: {contract.workers_comp_insurance && contract.workers_comp_insurance.policy}</li>
      </ul>


      <h2>Deductions</h2>

      <p>Wage Deductions: Employer may make the following deductions from Employee’s wages: </p>

      <ul>
        <li>State Income Tax: ${deductions && deductions.state_income_tax} per (paycheck, month, etc.)</li>
        <li>Federal Income Tax: ${deductions && deductions.federal_income_tax} per (paycheck, month, etc.) </li>
        {deductions && deductions.health_insurance ? <li>Employer Provided Health Insurance: ${deductions.health_insurance} per (paycheck, month, etc.) </li> : null}
        {deductions && deductions.food ? <li>Food and beverages: ${deductions.food} per (paycheck, month, etc.) </li> : null}
        {deductions && deductions.lodging ? <li>Lodging: ${deductions.lodging} per (paycheck, month, etc.) </li> : null}
        {deductions && deductions.other ? <li>Other: ${deductions.other} per (paycheck, month, etc.) </li> : null}
      </ul>

      <h2>Evaluations/reviews</h2>

      <p>After three months, Employer will {contract.evaluation_after_three_months ? null : <span>NOT</span>} give Employee a written job evaluation, and will {contract.evaluation_every_year ? null : <span>NOT</span>} provide an evaluation every year.</p>

      <p>Employer and Employee shall establish a fair process for settling complaints and increasing pay and benefits, giving due process to both parties. That process is described below:</p>
      <p>{contract.complaint_handling_process}</p>


      <h2>Confidentiality And Privacy</h2>

      <p>Employee {contract.worker_privacy && contract.worker_privacy.info_disclosure_permitted ? <span>may</span> : <span>will NOT</span>} disclose any and all private information obtained about the Employer during the course of employment, including but not limited to medical, financial, legal, and career information.</p>

      <p>Employee {contract.worker_privacy && contract.worker_privacy.family_pics_sharing_permitted ? <span>may</span> : <span>will NOT</span>} share any pictures of the children on any social media network or with strangers to the Employer.</p>

      {contract.worker_privacy && contract.worker_privacy.notes ? <div><p>Additional provisions:</p>
      <p>{contract.worker_privacy && contract.worker_privacy.notes}</p></div> : null}

      {contract.family_privacy && contract.family_privacy.restrict_private_comm ? <p>Employer may restrict or interfere with Employee’s means of private communications or monitor Employee’s private communications.</p> : <p>Employer will not restrict or interfere with Employee’s means of private communications will not monitor Employee’s private communications.</p>}

      {contract.family_privacy && contract.family_privacy.take_away_personal_docs ? <p>Employer will not take Employee’s documents or personal effects</p> : <p>Employer may take Employee’s documents or personal effects</p> }

      {contract.family_privacy && contract.family_privacy.force_service ? <p>Employer will not engage in conduct that constitutes forced services.</p> : <p>Employer may engage in conduct that constitutes forced services</p> }

      {contract.family_privacy && contract.family_privacy.surveillance ? <p>Employer may use surveillance technology without informing the Employee.</p> : <p>Employer will respect Employee’s right to privacy and will not use any surveillance technology without informing her/him.</p> }

      {contract.family_privacy && contract.family_privacy.notes ? <div><p>Additional provisions:</p>
      <p>{contract.family_privacy && contract.family_privacy.notes}</p></div> : null}

      <h2>Job Termination</h2>
      <h3>Severance and Lodging</h3>

      <p>The Employer and Employee agree that if either party chooses to end the employment, both the Employer and Employee will give each other {contract.termination_notice_length} days notice. Employer will provide Employee with {contract.termination_severance_length} days of severance upon termination.</p>

      <ul>
        <li>If the Employer asks the Employee to leave before the notice period is up, the Employee will {contract.termination_paid_if_evicted_early ? null : <span>NOT</span>} be paid for those weeks.</li>
        <li>If living accommodations have been provided to Employee, {contract.termination_lodging_length} days of lodging will be provided to Employee if Employee is terminated.</li>
      </ul>

      <h3>Immediate Termination</h3>
      <p>There may be cases when there are grounds or cause for immediate termination without notice (which the employer and Employee hopes will never happen). The Employer and Employee should discuss (and be as concrete as possible) what these grounds or cause for immediate termination without notice will be, and list them here:</p>
      <p>{contract.immediate_termination_grounds}</p>


      <p>Signed freely, without pressure, and with good understanding of the terms of this agreement:</p>


      <table className='table' style={{marginTop: 40}}>
        <tbody>
          <tr>
            <td style={{paddingBottom: 40}}>Employer: Sign AND print</td>
            <td>Date</td>
          </tr>
          <tr>
            <td style={{paddingBottom: 40}}>Employer: Sign AND print</td>
            <td>Date</td>
          </tr>
          <tr>
            <td style={{paddingBottom: 40}}>Employee: Sign AND print</td>
            <td>Date</td>
          </tr>
        </tbody>
      </table>

    </div>

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
      {endResult}
    </div>
    let fixErrors = <div>
      <h3>{"Ooops! There were some errors in the form. Please go back to the highlighted sections and complete them before proceeding."}</h3>
    </div>

    return <div className='container' style={{alignSelf: 'center'}}>
      {(isValid != undefined && isValid) ? printPage : printPage}
    </div>
  }
}