import React from 'react';
import {Link} from 'react-router';
var basePath = '/';
import EmailSignUp from '../components/EmailSignUp';
import $script from 'scriptjs';
import {FirstTimeTrigger} from '../components/MyModal';



export default class SectionPage extends React.Component {

  componentDidMount(){
    window.switchTo5x = true;
    $script('http://w.sharethis.com/button/buttons.js', function(){
      stLight.options({publisher: "126f4359-08ea-4054-a9af-defe6a39880a", doNotHash: false, doNotCopy: false, hashAddressBar: false});
    });

    // ['hs-01', 'hs-02', 'hs-03'].forEach(id => {
    //   React.findDOMNode(this.refs[id]).setAttribute('style', 'height:'+window.outerHeight+'px')
    // });
  }

  constructor(flux){
    super();
    this.state = {
      isModalOpen: true,
      modalWasShown: localStorage.getItem('modalWasShown')
    }
  }

  handleLearnMore(){
    this.setState({isModalOpen: false})
    localStorage.setItem('modalWasShown', true);
    window.scrollTo(0,React.findDOMNode(this.refs['hs-06']).offsetTop)
  }

  shouldModalBeShown(){
    return this.state.isModalOpen && !this.state.modalWasShown
  }

  render() {
    return <div style={{paddingBottom: 40, backgroundColor: '#3b3f48'}}>
        {this.shouldModalBeShown() ? <FirstTimeTrigger modalContent={<div>
            <div className='text-center'>
              <img src={require('../images/didyouknow_mass.png')}/>
              <a href='javascript:;'><span className='fa fa-times'/></a>
            </div>
            <div className='container'>
              <div className='row'>
                <div className='col-lg-7 col-lg-offset-1'>
                  <p style={{fontSize: '2em', marginTop: 40, color:'white'}}>Did you know that as of April 1st, 2015 Massachusetts requires a written agreement if you employ or you are employed as a domestic worker?</p>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-8 col-lg-offset-1'>
                  <a onClick={this.handleLearnMore.bind(this)} className='btn btn-link btn-lg btn-custom' style={{marginTop: 80, marginBottom: 80, marginRight: 40}}>
                    Learn More
                  </a>
                  <Link to='section' params={{sectionName: '1'}} className='btn btn-link btn-lg btn-custom' style={{marginTop: 80, marginBottom: 80}}>
                    Get an Agreement
                  </Link>
                </div>
              </div>
            </div>
          </div>}/> : null}
        <section ref='hs-01' id='hs-01' className='home-section bg-brand-black'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-lg-6 col-md-6 col-sm-12 col-md-12 text-center'>
                <img src={require('../images/home_01.png')} style={{margin: '0 auto', display: 'block'}} className='img-responsive' />
                <Link to='section' params={{sectionName: '1'}} className='btn btn-link btn-lg btn-custom' style={{marginTop: 80, marginBottom: 80}}>
                  Get Started!
                </Link>
              </div>
              <div className='col-lg-4 col-md-4 visible-lg' style={{position: 'relative', bottom: -90, zIndex: 1001}}>
                <img src={require('../images/pencil_paper_main.png')}/>
              </div>
            </div>
          </div>
        </section>

        <section ref='hs-02' id='hs-02' className='home-section bg-brand-blue'>
          <div className='container text-center' style={{paddingBottom: 100, paddingTop: 100}}>
            <div className='row'>
              <div className='col-lg-12 col-lmd12'>
                <p style={{fontSize: '2.2em'}}>
                  With In-House Agreements, creating your own work agreement is effortless. Step-by-step you’ll find the information you need, right at your fingertips. Simply answer the questions and fill in the blanks to fit your situation. Print your completed agreement, and CONGRATS you’re done!
                </p>
                <Link to='section' params={{sectionName: '1'}} className='btn btn-link btn-lg btn-custom' style={{marginTop: 80, marginBottom: 80}}>
                  Get Started!
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section ref='hs-03' id='hs-03' className='home-section bg-brand-orange'>
          <div className='container' style={{color: 'white'}}>
            <div className='row'>
              <div className='col-lg-4 col-md-4'>
                <div className='text-center' style={{height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img src={require('../images/scale.png')}/></div>
                <h2>Keeps You Informed </h2>
                <p style={{fontSize: '1.4em'}}>We work with the folks who helped implement the Bill of Rights, because agreements can feel complicated.</p>
              </div>
              <div className='col-lg-4 col-md-4'>
                <div className='text-center' style={{height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img src={require('../images/arrow.png')}/></div>
                <h2>Straightforward</h2>
                <p style={{fontSize: '1.4em'}}>We use plain language not legalese, because agreements can be daunting and confusing. </p>
              </div>
              <div className='col-lg-4 col-md-4'>
                <div className='text-center' style={{height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img src={require('../images/speech_bubbles.png')}/></div>
                <h2>Improves Communication</h2>

                <p style={{fontSize: '1.4em'}}>You can avoid problems in the future, because agreements resolve potential conflicts at the outset.</p>


              </div>
            </div>
          </div>
        </section>
        <section ref='hs-04' id='hs-04' className='home-section bg-brand-blue'>
           <div className='container'>
            <div className='row' style={{paddingBottom: 40}}>
              <div className='col-lg-6 col-md-6' style={{paddingTop: 20}}>
                <h2 style={{lineHeight:'1.4em', fontSize: '3em', marginBottom: 20}}>Share In-House Agreements</h2>
                <span className='st_facebook_custom' displayText='Facebook'/>
                <span className='st_email_custom' displayText='Email'/>
                <span className='st_twitter_custom' displayText='Tweet'/>
              </div>
              <div className='col-lg-6 col-md-6'>
                <p>We’re just getting started! Sign-up for news and updates</p>
                <EmailSignUp/>
              </div>
            </div>
          </div>
        </section>
        <section ref='hs-05' id='hs-05' className='home-section bg-brand-yellow' style={{padding:'10px 0 20px'}}>
          <div className='container'>
            <h1 style={{fontSize: '4em'}}>About the project</h1>
          </div>
        </section>
        <section ref='hs-06' id='hs-06' className='home-section bg-white'>
          <div className='container'>
            <p>
              We imagined In-House Agreements as a tool that makes it easier to create a work agreement. As a
              non-profit venture of <a href='http://www.faircarelabs.org/' target='_blank'>Fair Care Labs</a>, we are always looking for innovative ways to solve problems
              facing domestic workers and their employers. With Massachusetts’ new requirement for a written
              work agreement, we wondered: how will employers and employees, without HR departments of their
              own, create agreements that comply with the law?
            </p>
            <p>
              We think that the process of creating an agreement should be friendly, easy to understand,
              informative and feel inclusive. You should know or have access to both parties’ rights and
              responsibilities as you create your document, and it should be written simply and clearly so you can
              make informed decisions about your working relationship. It’s time that creating a contract makes
              sense to everyone, so you can agree amicably, easily and with dignity, like you wanted all along.
            </p>

            <div className='row partners'>
              <div className='col-lg-3 col-md-4 partner-slot'><h2>Our Partners</h2></div>
              <div className='col-lg-3 col-md-4 partner-slot'>
                <a href='http://www.domesticworkers.org/' target='_blank'>
                  <img src={require('../images/ndwa_slate.png')} className='img-responsive'/>
                </a>
                </div>
              <div className='col-lg-3 col-md-4 partner-slot'>
                <a href='http://domesticemployers.org/' target='_blank'>
                  <img src={require('../images/HIH_slate.png')} className='img-responsive'/>
                </a>
              </div>
              <div className='col-lg-3 col-md-4 partner-slot'>
                <a href='http://www.massdomesticworkers.org' target='_blank'>
                  <img src={require('../images/MCDW_slate.png')} className='img-responsive'/>
                </a>
                </div>
            </div>
            <hr/>
            <p className='text-center' style={{fontSize: '0.7em'}}>{'Disclaimer: You can use the ideas/terms set forth in the sample agreement on the website to create your own agreement. Be sure to complete/fill in your agreement to fit your own situation, and be as specific as possible about benefits, time off, rights and obligations, and so on.'}</p>

          </div>
        </section>
        <section ref='hs-07' id='hs-07' className='home-section bg-brand-black clearfix'>
          <div className='container'>
            <h1 style={{fontSize: '4em', marginBottom: 40}}>Additional Information</h1>
            <p style={{fontSize: '2em'}}>
              If you’d like to learn more about the Massachusetts requirement for a written
              work agreement, or more information about the Bill of Rights in general, we
              suggest you check out the following resources:
            </p>

            <div className='row' style={{marginTop: 100, width: '90%', marginLeft: 'auto', marginRight: 'auto', paddingBottom: 90}}>
              <div className='col-lg-6 col-md-6 leftColumn'>
                <div className='innerWrapper'>
                  <p className='text-center' style={{marginBottom: 80}}>
                    <a href='http://www.massdomesticworkers.org/new-page/' target='_blank'>
                      <img src={require('../images/terms.png')}/>
                    </a>
                  </p>

                  <p style={{fontSize: '2em'}}>Review the terms
                    or conditions of
                    employment for
                    domestic workers</p>
                </div>
              </div>
              <div className='col-lg-6 col-md-6'>
                <div className='row' style={{borderBottom: 'solid 1px white', paddingBottom: 40}}>
                  <div className='col-lg-4 col-md-4 text-center'>
                    <a href='http://domesticemployers.org/the-checklist/' target='_blank'>
                      <img src={require('../images/fair_employer.png')} align='left'/>
                    </a>
                  </div>
                  <div className='col-lg-8 col-md-8'>
                    <p style={{fontSize: '2em'}}>Learn more about being a fair domestic employer.</p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-lg-4 col-md-4 text-center' style={{paddingTop: 40}}>
                    <a href='http://www.huffingtonpost.com/2015/06/10/clinton-global-initiative_n_7546826.html?1433948679' target='_blank'>
                      <img src={require('../images/bill.png')}/>
                    </a>
                  </div>
                  <div className='col-lg-8 col-md-8' style={{paddingTop: 40}}>
                    <p style={{fontSize: '2em'}}>Read the Domestic Workers Bill of Rights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container-fluid'  style={{marginTop: 10}}>
            <a href='http://www.faircarelabs.org/' target='_blank' className='pull-right'>
              <img src={require('../images/greyfcl.png')}/>
            </a>
          </div>
        </section>


    </div>;
  }
}