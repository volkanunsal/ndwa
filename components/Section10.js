import React from 'react';
import t from 'tcomb-form';
import moment from 'moment';
import Contract from './Contract';
import $script from 'scriptjs';
import decorators from '../utils/decorators';

@decorators.googleAnalytics
export default class SectionPage extends React.Component {

  constructor(){
    super();

    this.state = {
      page: 0,
      amount: 1000
    }
  }

  printForm() {
    if (__PRERELEASE__ && window.ga) {
      ga('send', 'pageview', {
        page: '#' + this.props.path,
        title: 'PRINT!!'
      });
    }
    window.print()
  }

  nextPage(){
    this.setState({page: 1})
  }

  openChargeModal(e){
    e.preventDefault();
    // Open Checkout with further options
    this.handler.open({
      name: 'Fair Care Labs',
      description: '1 contract',
      amount: this.state.amount
    });

  }

  componentDidMount(){
    this.sendPageViewToGA()
    let {contract, flux} = this.props;
    flux.getActions('form_actions').validateSections(contract)
    // image: '/img/documentation/checkout/marketplace.png',
    $script('https://checkout.stripe.com/checkout.js', ()=>{
      this.handler = StripeCheckout.configure({
        key: 'pk_live_okq9QvfGQ7syX4sqWjOQzSRR',
        image: '/favicon.ico',
        token: (token)=>{
          // Use the token to create the charge with a server-side script.
          // You can access the token ID with `token.id`
          this.setState({page: 1})
        }
      });
    });
  }

  componentWillUnmount(){
    if (this.handler) {
      this.handler.close();
    };
  }

  handleAmountChange(e){
    this.setState({amount: e.target.value * 100})
  }

  render() {

    let {form} = this.props;
    let isValid = form.sections.reduce((prev, cur)=> prev && cur.validated && cur.valid, true)

    let {contract} = this.props;

    let printPage = <div>
        <div className='hidden-print'>
          {this.state.page == 0 ? <div className='text-center final-congrats final-page'>
            <div className='container'>
              <h3 style={{width: 800, margin: '0 auto'}}>Congratulations, you did it! You’ve completed your agreement. The suggested donation for using our tool is $10. Please consider helping us continue to improve this site and donate by clicking the button below.</h3>
              <p>
                <div className='input-group' style={{width:200, margin: '0 auto'}}>
                  <span className='input-group-addon'>$</span>
                  <input className='form-control input-lg' type='number' placeholder='Enter donation amount' value={this.state.amount / 100} onChange={this.handleAmountChange.bind(this)} min={0.5}/>
                </div>
                <a
                  onClick={this.openChargeModal.bind(this)}
                  className='btn btn-lg btn-yesno'
                  style={{marginTop: 20, width: 200}}>Donate</a>
              </p>

              <p>
                Be sure to review your information by using the tabs before printing it, making multiple copies and signing it!
              </p>
              <p>
                <a
                  href='https://fclabs.typeform.com/to/FW7sdk'
                  target='_blank'
                  className='btn btn-lg btn-print invert'
                  style={{marginTop: 20, width: 300}}>SHARE YOUR FEEDBACK</a>
              </p>
              <p>
                <a
                  onClick={this.nextPage.bind(this)}
                  className='btn btn-lg btn-print'
                  style={{marginTop: 20, width: 200}}>Ready to Print</a>
              </p>

            </div>
          </div> : null}

          {this.state.page == 1 ? <div className='text-center final-page'>
            <div className='container'>
              <h3>Leave this browser/page open after you print your agreement. Once you’ve read/reviewed your printed agreement you can return to the sections/questions on this site and make edits to your responses if needed, and then print the agreement again.</h3>
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
                <ul className='list-inline'>
                  <li><a href='http://faircarepledge.com' target='_blank'>Take the Fair Care Pledge</a></li>
                  <li><a href='www.faircarelabs.org' target='_blank'>Visit Fair Care Labs</a></li>
                </ul>
              </div>
            </div>
          </div> : null }
        </div>
        {this.state.page == 1 ? <Contract {...contract} /> : null}

    </div>
    let fixErrors = <div className='final-page' style={{height: 400}}>
      <div className='container text-center'>
        <img src={require('../images/warning.png')} />

        <h1>{"Oops. Looks like you missed a few things. You can review your information by clicking on the tabs. Tabs in red indicate that there is an error or information missing."}</h1>
        </div>
    </div>

    return <div className='container-fluid' style={{alignSelf: 'center'}}>
      {(isValid != undefined && isValid) ? printPage : fixErrors}
    </div>
  }
}