import React from 'react';
import t from 'tcomb-form';
import moment from 'moment';
import Contract from './Contract';
import $script from 'scriptjs';

class PrintNow extends React.Component {
  render(){
    return <div className='text-center'>
      <h3>Your agreement is ready! Please remember that you can amend the agreement with a pen, on the document itself, after you’ve printed it out.</h3>


    </div>
  }
}
export default class SectionPage extends React.Component {
  printForm() {
    window.print()
  }

  openChargeModal(){
    // Open Checkout with further options
    this.handler.open({
      name: 'Fair Care Labs',
      description: '1 contract',
      amount: 1000
    });
    e.preventDefault();
  }

  componentDidMount(){
    // image: '/img/documentation/checkout/marketplace.png',
    $script('https://checkout.stripe.com/checkout.js', ()=>{
      this.handler = StripeCheckout.configure({
        key: 'pk_KTys5b7o2EoLYZ6BkRxUD1QeqhEvf',
        token: function(token) {
          // Use the token to create the charge with a server-side script.
          // You can access the token ID with `token.id`
          console.log(token)

          // TODO: show the print now component
        }
      });
    });
  }

  componentWillUnmount(){
    this.handler.close();
  }

  render() {

    let {form} = this.props;
    let isValid = form.sections.reduce((prev, cur)=> prev && cur.validated && cur.valid, true)

    let {contract} = this.props;

    let printPage = <div className='hidden-print'>
        <div className='text-center'>
          <h3>Congratulations, you did it! You’ve reached the end of the agreement. Be sure to review your information by using the tabs before printing it, making multiple copies and signing it!</h3>
          <p>
            <a
              onClick={this.printForm.bind(this)}
              className='btn btn-lg btn-primary'
              style={{marginTop: 20, width: 200}}>Print</a>
          </p>

          <p>
            <span className='fa fa-info-circle'/> Remember: You can always edit an agreement that you’ve printed with a pen.</p>
          <h3>
            We need your help to pay for this tool and keep it up to date. Please make a $10.00 donation (or other amount) and/or give us your email address so we can send you the latest updates and access to new tools, like this one.
            You can print and download your agreement once your donation clears.
          </h3>
          <p>
            <a
              onClick={this.openChargeModal.bind(this)}
              className='btn btn-lg btn-warning'
              style={{marginTop: 20, width: 200}}>Donate</a>
          </p>
        </div>

        <div className='text-center'>
          <h3>Your agreement is ready! Please remember that you can amend the agreement with a pen, on the document itself, after you’ve printed it out.</h3>
          <a
            onClick={this.printForm.bind(this)}
            className='btn btn-lg btn-primary'
            style={{marginTop: 20, width: 200}}>Print</a>

          <h4>Thank you</h4>
          <p>for taking the steps toward creating an agreement between you and your domestic worker!</p>
        </div>

      <Contract {...contract} />
    </div>
    let fixErrors = <div>
      <h3>{"Oops. Looks like you missed a few things. You can review your information by clicking on the tabs. Tabs in red indicate that there is an error or information missing."}</h3>
    </div>


    return <div className='container' style={{alignSelf: 'center'}}>


      {(isValid != undefined && isValid) ? printPage : printPage}
    </div>
  }
}