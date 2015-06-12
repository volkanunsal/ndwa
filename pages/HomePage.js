import React from 'react';
import {Link} from 'react-router';
var basePath = '/';
import EmailSignUp from '../components/EmailSignUp';

export default class SectionPage extends React.Component {


  render() {
    return <div>
        <section id='hs-01' className='home-section bg-brand-black'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-lg-6 col-sm-12 col-md-12 text-center'>
                <img src={require('../images/home_01.png')}/>
              </div>
              <div className='col-lg-4 visible-lg' style={{position: 'relative', bottom: -90, zIndex: 1001}}>
                <img src={require('../images/pencil_paper_main.png')}/>
              </div>
            </div>
          </div>
        </section>

        <section id='hs-02' className='home-section bg-brand-blue'>
          <div className='container text-center' style={{paddingBottom: 200}}>
            <div className='row'>
              <div className='col-lg-12'>
                <Link to='section' params={{sectionName: '1'}} className='btn btn-link btn-lg btn-custom' style={{marginTop: 80, marginBottom: 80}}>
                  Get Started!
                </Link>
                <p style={{fontSize: '3em'}}>
                  With In-House Agreements, creating your own work agreement is effortless. Step-by-step you’ll find the information you need, right at your fingertips. Simply answer the questions and fill in the blanks to fit your situation. Print your completed agreement, and CONGRATS you’re done!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id='hs-03' className='home-section bg-brand-orange'>
          <div className='container' style={{color: 'white'}}>
            <div className='row'>
              <div className='col-lg-4'>
                <div className='text-center' style={{height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img src={require('../images/scale.png')}/></div>
                <h2>Keeps You Informed </h2>
                <p style={{fontSize: '1.4em'}}>We work with the folks who helped implement the Bill of Rights, because agreements can feel complicated.</p>
              </div>
              <div className='col-lg-4'>
                <div className='text-center' style={{height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img src={require('../images/arrow.png')}/></div>
                <h2>Straightforward</h2>
                <p style={{fontSize: '1.4em'}}>We use plain language not legalese, because agreements can be daunting and confusing. </p>
              </div>
              <div className='col-lg-4'>
                <div className='text-center' style={{height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img src={require('../images/speech_bubbles.png')}/></div>
                <h2>Improves Communication</h2>

                <p style={{fontSize: '1.4em'}}>You can avoid problems in the future, because agreements resolve potential conflicts at the outset.</p>


              </div>
            </div>
          </div>
        </section>
        <section id='hs-04' className='home-section bg-brand-blue'>
           <div className='container'>
            <div className='row' style={{paddingBottom: 40}}>
              <div className='col-lg-6' style={{paddingTop: 20}}>
                <h2 style={{lineHeight:'1.4em', fontSize: '3em'}}>Share In-House Agreements</h2>
                <ul className='list-inline'>
                  <li><img src={require('../images/circle_FB.png')}/></li>
                  <li><img src={require('../images/circle_mail.png')}/></li>
                  <li><img src={require('../images/circle_tweet.png')}/></li>
                </ul>
              </div>
              <div className='col-lg-6'>
                <p>We’re just getting started! Sign-up for news and updates</p>
                <EmailSignUp/>
              </div>
            </div>
          </div>
        </section>
        <section id='hs-05' className='home-section bg-brand-yellow' style={{padding:'10px 0 20px'}}>
          <div className='container'>
            <h1 style={{fontSize: '4em'}}>About the project</h1>
          </div>
        </section>
        <section id='hs-06' className='home-section bg-white'>
          <div className='container'>
            <p>
              We imagined In-House Agreements as a tool that makes it easier to create a work agreement. As a
              non-profit venture of Fair Care Labs, we are always looking for innovative ways to solve problems
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
              <div className='col-lg-3 partner-slot'><h2>Our Partners</h2></div>
              <div className='col-lg-3 partner-slot'>
                <a href='http://www.domesticworkers.org/' target='_blank'>
                  <img src={require('../images/ndwa_slate.png')} className='img-responsive'/>
                </a>
                </div>
              <div className='col-lg-3 partner-slot'>
                <a href='http://domesticemployers.org/' target='_blank'>
                  <img src={require('../images/HIH_slate.png')} className='img-responsive'/>
                </a>
              </div>
              <div className='col-lg-3 partner-slot'>
                <a href='http://www.massdomesticworkers.org' target='_blank'>
                  <img src={require('../images/MCDW_slate.png')} className='img-responsive'/>
                </a>
                </div>
            </div>
            <hr/>
            <p className='text-center' style={{fontSize: '0.7em'}}>
              Disclaimer: You can use the ideas/terms set forth in the sample agreement on the website to create your own agreement. Be sure
              to complete/fill in your agreement to fit your own situation, and be as specific as possible about benefits, time off, rights and
              obligations, and so on.
            </p>

          </div>
        </section>
        <section id='hs-07' className='home-section bg-brand-black' style={{padding:'10px 0 20px', marginBottom: 0}}>
          <div className='container'>
            <h1 style={{fontSize: '4em', marginBottom: 40}}>Additional Information</h1>
            <p style={{fontSize: '2em'}}>
              If you’d like to learn more about the Massachusetts requirement for a written
              work agreement, or more information about the Bill of Rights in general, we
              suggest you check out the following resources:
            </p>

            <div className='row' style={{marginTop: 100, width: '90%', marginLeft: 'auto', marginRight: 'auto', paddingBottom: 90}}>
              <div className='col-lg-6' style={{marginBottom: 60}}>
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
              <div className='col-lg-6'>
                <div className='row' style={{borderBottom: 'solid 1px white', paddingBottom: 40}}>
                  <div className='col-lg-4 text-center'>
                    <a href='http://domesticemployers.org/the-checklist/' target='_blank'>
                      <img src={require('../images/fair_employer.png')} align='left'/>
                    </a>
                  </div>
                  <div className='col-lg-8'>
                    <p style={{fontSize: '2em'}}>Learn more about being a fair domestic employer.</p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-lg-4 text-center' style={{paddingTop: 40}}>
                    <a href='http://www.huffingtonpost.com/2015/06/10/clinton-global-initiative_n_7546826.html?1433948679' target='_blank'>
                      <img src={require('../images/bill.png')}/>
                    </a>
                  </div>
                  <div className='col-lg-8' style={{paddingTop: 40}}>
                    <p style={{fontSize: '2em'}}>Read the Domestic Workers Bill of Rights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href='http://www.faircarelabs.org/' target='_blank'  style={{position: 'absolute', right: 20, bottom: 10}}>
            <img src={require('../images/FCL_Labs.png')}/>
          </a>
        </section>


    </div>;
  }
}