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
  constructor(){
    super();

    this.state = {
      page: 0
    }
  }

  printForm() {
    window.print()
  }

  nextPage(){
    this.setState({page: 1})
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
    let {contract, flux} = this.props;
    flux.getActions('form_actions').validateSections(contract)
    // image: '/img/documentation/checkout/marketplace.png',
    $script('https://checkout.stripe.com/checkout.js', ()=>{
      this.handler = StripeCheckout.configure({
        key: 'pk_KTys5b7o2EoLYZ6BkRxUD1QeqhEvf',
        token: (token)=>{
          // Use the token to create the charge with a server-side script.
          // You can access the token ID with `token.id`
          this.setState({page: 1})
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

    let printPage = <div>
        <div className='hidden-print'>
          {this.state.page == 0 ? <div className='text-center final-congrats final-page'>
            <div className='container'>
              <h3>Congratulations, you did it! You’ve reached the end of the agreement. Be sure to review your information by using the tabs before printing it, making multiple copies and signing it!</h3>
              <p>
                <a
                  onClick={this.nextPage.bind(this)}
                  className='btn btn-lg btn-print'
                  style={{marginTop: 20, width: 200}}>Next</a>
              </p>
              <h3>
                We need your help to pay for this tool and keep it up to date. Please make a $10.00 donation (or other amount) and/or give us your email address so we can send you the latest updates and access to new tools, like this one.
                You can print and download your agreement once your donation clears.
              </h3>
              <p>
                <a
                  onClick={this.openChargeModal.bind(this)}
                  className='btn btn-lg btn-yesno'
                  style={{marginTop: 20, width: 200}}>Donate</a>
              </p>

            </div>
          </div> : null}

          {this.state.page == 1 ? <div className='text-center final-page'>
            <div className='container'>
              <h3>Your agreement is ready! Please remember that you can amend the agreement with a pen, on the document itself, after you’ve printed it out.</h3>
              <a
                onClick={this.printForm.bind(this)}
                className='btn btn-lg btn-link'
                style={{marginTop: 20, width: 200}}>
                  Print
                  <br/>
                  <img src={require('../images/print.png')}/>
                </a>
              <div style={{width: '50%', margin: '0 auto'}}>
                <p>
                  <span className='fa fa-info-circle'/> Remember: You can always edit your agreement after you print it, by making handwritten changes.</p>

                <h3>Thank you</h3>
                <p>For taking the steps toward creating an agreement between you and your domestic worker!</p>
              </div>
            </div>
          </div> : null }
        </div>

      <Contract {...contract} />
    </div>
    let fixErrors = <div className='final-page' style={{height: 400}}>
      <div className='container text-center'>
        <span className='fa fa-warning fa-3x text-danger' style={{fontSize: '6em'}}/>
        <h1>{"Oops. Looks like you missed a few things. You can review your information by clicking on the tabs. Tabs in red indicate that there is an error or information missing."}</h1>
        </div>
    </div>

    return <div className='container-fluid' style={{alignSelf: 'center'}}>
      {(isValid != undefined && isValid) ? printPage : fixErrors}
    </div>
  }
}