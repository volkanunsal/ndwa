import React from 'react';
import {PropTypes} from 'react/addons';
var T = PropTypes;
import moment from 'moment';

export default class Contract extends React.Component {
  render(){
    let {additional_tasks, bad_weather_day_paid, benefits, board_no, board_provided, board_yes, cancelled_day_paid, childcare_tasks, children, cleaning_tasks, complaint_handling_process, deductions, employee, employer, evaluation_after_three_months, evaluation_every_year, family_privacy, hourly_rate, immediate_termination_grounds, overtime_holidays, overtime_holidays_other, overtime_notice_length, overtime_rate, parental_leave, payday, payment_frequency, personal_days, reduced_hours_reg_wage, room, start_date, termination_lodging_length, termination_notice_length, termination_paid_if_evicted_early, termination_severance_length, vacation_days, valid_work_schedule, work_address, work_days, work_week_duration, worker_privacy, workers_comp_insurance, unemployment_insurance} = this.props;

    let employee_name = employee && employee.name;
    let employer_name = employer && employer.name;

    if (overtime_holidays) {
      let i = 0;
      let days = []
      for(let day in overtime_holidays){
        if (overtime_holidays[day]) {
          days.push(<li key={i++}>{day}</li>)
        };
      }
      overtime_holidays = days
    };



    let employee_room;
    if (room) {
      let {living_accommodations} = room;
      let {entry} = living_accommodations || {};

      if (living_accommodations) {
        employee_room = <div>
          <p>The living space for the Employee provided by the Employer is as follows:</p>
          <ul>
            <li>Size of room: {living_accommodations.size}</li>
            <li>Number of beds in the room: {living_accommodations.num_beds}</li>
            <li>Number of people living in the room besides Employee of this agreement: {living_accommodations.num_people}</li>
            {living_accommodations.working_heat ? <li>Heat works</li> : <li>There is no heat</li>}
            {living_accommodations.working_heat ? <li>Heat is {living_accommodations.heat_controlled ? null : <span>NOT</span>} controlled by Employee</li> : null}
            {living_accommodations.clean ? <li>Room free of dust, bugs, mold</li> : null}
          </ul>

          {entry && (entry.notice_length || entry.emergency_repairs || entry.specific_repairs || entry.other) ? <div>
              <p>The Employer may enter the Employee's living space ONLY under the following agreed-upon circumstances:</p>
              <ul>
                <li>With notice of {entry && entry.notice_length} days if possible and if not possible letting the Employee know as soon as reasonably possible.</li>
                {entry && entry.emergency_repairs ? <li>In cases of emergencies or repairs.</li> : null}
                {entry && entry.specific_repairs ? <li>At the Employee's request for repairs.</li> : null}
                {entry && entry.other ? <li>{entry.other}</li> : null}
              </ul>
            </div> : <p>The Employer may NOT enter the Employee's living space under any circumstances.</p>}
        </div>
      };
    };

    let resp_1 = children && children.length > 0 ? <div>
      <h4>Childcare and nanny services</h4>

      <h4>Children</h4>
      {children && children.map((child,i) => {
        return <p key={i}>
          <b>Name:</b> {child.name}<br/>
          <b>Age:</b> {child.age}<br/>
          <b>Description of care:</b> {child.description_of_care}
        </p>
      })}
      {childcare_tasks && childcare_tasks.length > 0 ? <div><h4>Childcare tasks</h4>
      <ul>{childcare_tasks.map(task => <li>{task}</li>)}</ul></div> : null}
    </div> : null

    let resp_3 = (cleaning_tasks && cleaning_tasks.length > 0) ? <div>
      <h4>House Cleaning and Home Management</h4>
      {cleaning_tasks.length > 0 ? <div><h4>Homecare tasks</h4>
      <ul>{cleaning_tasks.map((task,i) => <li key={i}>{task}</li>)}</ul></div> : null}
    </div> : null;


    return <div className='visible-print'>
      <div style={{pageBreakAfter: 'always'}}>
        <h2>Sample Domestic Employer/Employee Agreement</h2>
        <p>This agreement is between {employee_name}, hereinafter 'Employee” and'{employer_name}, hereinafter 'Employer.' {work_address ? <span>The work will be done at: {work_address}.</span> : null} {start_date ? <span>This agreement will begin on  {moment(start_date).format("dddd, MMMM Do YYYY")}.</span> : null}</p>

        <h4>Additional Party Information</h4>
        <h5>Employer</h5>
        <p>
          {employer.phone ? <p>Phone: {employer.phone}</p> :null}
          {employer.address ? <p>Address: {employer.address}</p> :null}
          {employer.additional_info ? <p>Additional Info: {employer.additional_info}</p> :null}
        </p>
        <h5>Employee</h5>
        <p>
          {employee.phone ? <p>Phone: {employee.phone}</p> :null}
          {employee.address ? <p>Address: {employee.address}</p> :null}
          {employee.additional_info ? <p>Additional Info: {employee.additional_info}</p> :null}
        </p>

        <h3>1. Work Responsibilities</h3>
        {resp_1}
        {resp_3}
        {additional_tasks ? <div><h4>Additional tasks</h4> <p>{additional_tasks}</p></div> : null}

        <h3>2. Scheduling</h3>
        <p>The hours of employment will be the following:</p>
        <ul>
          {work_days && work_days.filter(day=> day.active).map((day,i) => {
            return <li key={i}>{day.name}: {day.times[0]} - {day.times[1]}</li>
          })}
        </ul>

        <p>Total weekly hours {moment.duration(work_week_duration || 0, 'milliseconds').asHours()}.</p>

        <h3>3. Compensation and Provisions</h3>
        <p>The Employer will pay the Employee ${hourly_rate} per hour and the Employee will be paid on {payday} on a {payment_frequency} basis.</p>

        <p>The Employee will be paid a rate ${overtime_rate} per hour for overtime hours (any hour worked over 40 hours per week).</p>

        <p>The Employer will attempt to provide the Employee with {overtime_notice_length} day(s) notice, in advance of requesting overtime hours when feasible, for days not otherwise specified herein.</p>
        <ol>
          <li>{"If the Employee voluntarily agrees to work on a scheduled day off, this agreement must be in writing and s/he must be paid at time-and-a-half for hours worked during this period. The written agreement shall be attached to this agreement or is set out in the Appendix."}</li>
          <li>{"If the Employee must be on duty for 24 consecutive hours or more, the Employer and Employee may make a prior written agreement to exclude from pay a regularly scheduled sleeping period of 8 hours or less for each 24-hour period. The written agreement shall be attached to this agreement or is set out in the Appendix."}</li>
        </ol>

        <h3>4. Time off</h3>

        <p>The Employee will {vacation_days && vacation_days > 0 ?  null : <span>NOT</span> } be given  {vacation_days && vacation_days > 0 ? vacation_days : null} paid vacation days.</p>

        <p>The Employee will {personal_days && personal_days > 0 ?  null : <span>NOT</span> } be given {personal_days} paid personal/sick days.</p>

        {overtime_holidays && overtime_holidays.length > 0 ? <div><p>The Employee will be paid for the following Holidays:</p>
        <ul>{overtime_holidays}</ul> {overtime_holidays_other ? <div> and also <p>{overtime_holidays_other}</p></div> : null}</div> : null}


        <p>If Employee requests parental leave for the birth or adoption of a child, Employee will provide {parental_leave && parental_leave.notice} days notice prior to taking the requested leave.</p>

        <p>The Employer will {parental_leave && parental_leave.paid ?  null : <span>NOT</span> } pay Employee for Parental Leave.</p>

        <p>In the event the Employer temporarily reduces the Employee's hours the Employer {reduced_hours_reg_wage ? <span>guarantees</span> : <span>does NOT guarantee</span>} to continue to pay the Employee her regular wages.</p>

        <h3>5. Cancellations</h3>
        <p>If the Employer has to cancel one or more days of the Employee's workweek, s/he {cancelled_day_paid ? <span>will</span> : <span>will NOT</span>} be paid as usual.</p>
        <p>The Employer expects that the Employee will make every effort to come to work during bad weather.  When a city or region is shutdown because of poor weather conditions, the Employer will {bad_weather_day_paid ? null : <span>NOT</span>} pay the Employee for days of missed work.</p>

        <h3>6. Room and board</h3>
        <p>The Employee is {room && room.provided ? null : <span>NOT</span>} required to live with the Employer.</p>

        {employee_room}

        <p>The Employer will {board_provided ? null : <span>NOT</span>} offer food and meals to Employee</p>

        {board_yes ? <ul>
          {board_yes && board_yes.house_food ? <li>Employee may eat/drink household foods or beverages. </li> : null}
          {board_yes && board_yes.free_food ? <li>The food/beverages are provided free of charge.</li> : null}
        </ul> : null}


        {board_no ? <div>
          <p>The Employee:</p>
          <ul>
            {board_no.bring_own_food ? <li>May bring his/her own food to work.</li> : null }
            {board_no.food_paid ? <li>Employee and Employer have agreed that Employee will pay for food.</li> : null }
            {board_no.food_paid ? <li>Employee and Employer have agreed that Employee will pay for food.</li> : null }
            {board_no.food_paid_notes ? <li>{board_no.food_paid_notes}</li> : null }
          </ul>
        </div> : null }

        <h3>7. Benefits/Insurance</h3>
        {benefits && (benefits.health || benefits.transportation || benefits.other) ? <div>
          <p>The Employer offers the Employee the following insurance benefits per year:</p>
          <ul>
            {benefits && benefits.health ? <li>Paid Health insurance.</li> : null}
            {benefits && benefits.transportation ? <li>Transportation costs (exclusive of mileage/car use for on-the-job related tasks).</li> : null}
            {benefits && benefits.other ? <li>{benefits.other}</li> : null}
          </ul>
        </div> : <p>The Employer does not offer the Employee any insurance benefits.</p>}

        {workers_comp_insurance ? <div><p>The Employer's workers compensation company and information are as follows:</p>
        <ul>
          <li>INSURANCE COMPANY: {workers_comp_insurance.company}</li>
          <li>INSURANCE POLICY: {workers_comp_insurance.policy}</li>
        </ul></div> : null}

        {unemployment_insurance ? <div><p>The Employer's unemployment insurance company and information are as follows:</p>
        <ul>
          <li>INSURANCE COMPANY: {unemployment_insurance.company}</li>
          <li>INSURANCE POLICY: {unemployment_insurance.policy}</li>
        </ul></div> : null}

        <h3>8. Deductions</h3>
        <p>Wage Deductions: Employer may make the following deductions from Employee’s wages: </p>
        <ul>
          <li>State Income Tax: ${deductions && deductions.state_income_tax} per (paycheck, month, etc.)</li>
          <li>Federal Income Tax: ${deductions && deductions.federal_income_tax} per (paycheck, month, etc.) </li>
          {deductions && deductions.health_insurance ? <li>Employer Provided Health Insurance: ${deductions.health_insurance} per (paycheck, month, etc.) </li> : null}
          {deductions && deductions.food ? <li>Food and beverages: ${deductions.food} per (paycheck, month, etc.) </li> : null}
          {deductions && deductions.lodging ? <li>Lodging: ${deductions.lodging} per (paycheck, month, etc.) </li> : null}
          {deductions && deductions.other ? <li>Other: ${deductions.other} per (paycheck, month, etc.) </li> : null}
        </ul>

        <h3>9. Evaluations/reviews</h3>
        <p>The Employer will {evaluation_after_three_months ? null : <span>NOT</span>} provide Employee a written job evaluation after three months, and will {evaluation_every_year ? null : <span>NOT</span>} provide a written evaluation every year.</p>

        <p>Employer and Employee shall establish a fair process for settling complaints and increasing pay and benefits, giving due process to both parties. That process is described below:</p>
        <p>{complaint_handling_process}</p>

        <h3>10. Confidentiality And Privacy</h3>
        <p>Employee {worker_privacy && worker_privacy.info_disclosure_permitted ? <span>may</span> : <span>will NOT</span>} disclose any and all private information obtained about the Employer during the course of employment, including but not limited to medical, financial, legal, and career information.</p>
        <p>Employee {worker_privacy && worker_privacy.family_pics_sharing_permitted ? <span>may</span> : <span>will NOT</span>} share any pictures of the children on any social media network or with strangers to the Employer.</p>
        {worker_privacy && worker_privacy.notes ? <div><p>Additional provisions:</p>
        <p>{worker_privacy && worker_privacy.notes}</p></div> : null}
        {family_privacy && family_privacy.restrict_private_comm ? <p>Employer may restrict or interfere with Employee’s means of private communications or monitor Employee’s private communications.</p> : <p>Employer will not restrict or interfere with Employee’s means of private communications will not monitor Employee’s private communications.</p>}
        {family_privacy && family_privacy.take_away_personal_docs ? <p>Employer will not take Employee’s documents or personal effects</p> : <p>Employer may take Employee’s documents or personal effects</p> }
        {family_privacy && family_privacy.force_service ? <p>Employer will not engage in conduct that constitutes forced services.</p> : <p>Employer may engage in conduct that constitutes forced services</p> }
        {family_privacy && family_privacy.surveillance ? <p>Employer may use surveillance technology without informing the Employee.</p> : <p>Employer will respect Employee’s right to privacy and will not use any surveillance technology without informing her/him.</p> }
        {family_privacy && family_privacy.notes ? <div><p>Additional provisions:</p>
        <p>{family_privacy && family_privacy.notes}</p></div> : null}

        <h3>11. Job Termination</h3>
        <h4>Severance and Lodging</h4>
        <p>The Employer and Employee agree that either party may terminate this Agreement by providing {termination_notice_length} week's notice. Provided, however, if Employee is a live-in Employee and is terminated without cause, the Employer shall give written notice, and Employer shall give {termination_lodging_length} days of lodging to Employee or {termination_severance_length} weeks of salary to Employee as severance. Whether terminated with or without cause, the Employer will provide {termination_severance_length} week's severance pay upon termination. If Employer asks the Employee to leave before the notice period is up, the Employee will be paid for those weeks.</p>
        <h4>Immediate Termination</h4>
        <p>There may be cases when there are grounds or cause for immediate termination without notice (which the Employer and Employee hopes will never happen). The Employer and Employee should discuss (and be as concrete as possible) what these grounds or cause for immediate termination without notice will be, and list them here:</p>
        <p>{immediate_termination_grounds}</p>
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

      <div style={{pageBreakAfter: 'always'}}>
        <h3 className='text-center'>APPENDIX 1</h3>


        <p>If the Employee voluntarily agrees to work on a scheduled day off, this agreement must be in writing and s/he must be paid at time-and-a-half for hours worked during this period. </p>

        <p>I, _____________________ (Employee), agree to work on _________ (date) for ________ (amount of time) and I, ________ (Employer), agree to pay time and a half for hours worked.</p>

        <p>Initialed:_____ (Employee)    Initialed: _____ (Employee)     Date: ____________</p>
      </div>
      <div>
        <h3 className='text-center'>APPENDIX 2</h3>

        <p>If the Employee must be on duty for 24 consecutive hours or more:
        The Employer and Employee may make a prior written agreement to exclude from pay a regularly scheduled sleeping period of 8 hours or less for each 24-hour period. </p>

        <p>I, _____________________ (Employee), knowing I am working 24 consecutive hours, agree that  ____ hours (up to 8 hours ) will be unpaid paid time provided that I am given undisturbed and uninterrupted sleeping time.</p>

        <p>Initialed: _____ (Employee)     Initialed: _____ (Employer)     Date: ______________</p>

      </div>
    </div>
  }
}

Contract.propTypes = require('../data/DOMAIN-react');