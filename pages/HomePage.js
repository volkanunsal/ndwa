import React from 'react';
import {Link} from 'react-router';
var basePath = '/';

export default class SectionPage extends React.Component {


  render() {
    return <div>
        <section id='hs-01' className='home-section bg-brand-black'>
          <div className='container-fluid text-center'>
            <img src={require('../images/home_01.png')}/>
            <img src={require('../images/pencil_paper_main.png')} style={{position: 'relative', bottom: -120, zIndex: 998}}/>
          </div>
        </section>

        <section id='hs-02' className='home-section bg-brand-blue'>
          <div className='container text-center'>

            <Link to='section' params={{sectionName: '1'}} className='btn btn-link btn-lg btn-custom' style={{marginTop: 80, marginBottom: 80}}>
              Get Started!
            </Link>

            <p style={{fontSize: '3em'}}>
              With In-House Agreements, creating your own work agreement is effortless. Step-by-step you’ll find the information you need, right at your fingertips. Simply answer the questions and fill in the blanks to fit your situation. Print your completed agreement, and CONGRATS you’re done!
            </p>
          </div>
        </section>
        <section id='hs-03' className='home-section bg-brand-orange'>
          <div className='container'>
            <table style={{color: 'white'}}>
              <tbody>
                <tr>
                  <td>
                    <div className='text-center'><img src={require('../images/scale.png')}/></div>
                    <h2>Keeps You Informed </h2>
                  </td>
                  <td>
                    <div className='text-center'><img src={require('../images/arrow.png')}/></div>
                    <h2>Straightforward</h2>
                  </td>
                  <td>
                    <div className='text-center'><img src={require('../images/speech_bubbles.png')}/></div>
                    <h2>Improves Communication</h2>
                  </td>
                </tr>
                <tr style={{color: 'white', fontSize: '1.6em'}}>
                  <td>
                    <p>We work with the folks who helped implement the Bill of Rights, because agreements can feel complicated.</p>
                  </td>
                  <td>
                    <p>We use plain language not legalese, because agreements can be daunting and confusing. </p>
                  </td>
                  <td>
                    <p>You can avoid problems in the future, because agreements resolve potential conflicts at the outset.</p>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </section>
        <section id='hs-04' className='home-section bg-brand-blue'>
           <div className='container' style={{minHeight: 250}}>
            <div className='row' style={{display: 'flex', alignItems: 'stretch', justifyContent: 'center', minHeight: 250, paddingBottom: 40}}>
              <div className='col-lg-6' style={{paddingTop: 20}}>
                <h2 style={{lineHeight:'1.4em', fontSize: '3em'}}>Share In-House Agreements</h2>
                <ul className='list-inline'>
                  <li><img src={require('../images/circle_FB.png')}/></li>
                  <li><img src={require('../images/circle_mail.png')}/></li>
                  <li><img src={require('../images/circle_tweet.png')}/></li>
                </ul>
              </div>
              <div className='col-lg-6' style={{borderLeft: 'solid 1px white', fontSize: '2em', paddingTop: 20, paddingLeft: 40}} >
                <p>We’re just getting started! Sign-up for news and updates</p>
                <form id='signup-form'>
                  <input type='text' className='form-control input-lg' placeholder='Name'/>
                  <input type='text' className='form-control input-lg' placeholder='Email Address'/>
                  <a href='javascript:;'>
                    <img src={require('../images/circle_check.png')}/>
                  </a>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section id='hs-05' className='home-section bg-brand-yellow' style={{padding:'10px 0 20px'}}>
          <div className='container'>
            <h1 style={{fontSize: '4em'}}>About the project</h1>
          </div>
        </section>
        <section id='hs-06' className='home-section bg-white' style={{color: 'black', paddingBottom: 40, fontSize: '2em'}}>
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

            <div className='partners'>
              <div className='row'>
                <div className='col-lg-3 partner-slot'><h2>Our Partners</h2></div>
                <div className='col-lg-3 partner-slot'>
                  <img src={require('../images/ndwa_slate.png')}/></div>
                <div className='col-lg-3 partner-slot'>
                  <img src={require('../images/HIH_slate.png')}/></div>
                <div className='col-lg-3 partner-slot'>
                  <img src={require('../images/MCDW_slate.png')}/></div>
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
              <div className='col-lg-6'>
                <p className='text-center' style={{marginBottom: 80}}>
                  <img src={require('../images/terms.png')}/>
                </p>

                <p style={{fontSize: '2em'}}>Review the terms
                  or conditions of
                  employment for
                  domestic workers</p>
              </div>
              <div className='col-lg-6'>
                <div className='row' style={{borderBottom: 'solid 1px white', paddingBottom: 40}}>
                  <div className='col-lg-4'>
                    <img src={require('../images/fair_employer.png')} align='left'/>
                  </div>
                  <div className='col-lg-8'>
                    <p style={{fontSize: '2em'}}>Learn more about being a fair domestic employer.</p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-lg-4' style={{paddingTop: 40}}>
                    <img src={require('../images/bill.png')}/>
                  </div>
                  <div className='col-lg-8' style={{paddingTop: 40}}>
                    <p style={{fontSize: '2em'}}>Read the Domestic Workers Bill of Rights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img src={require('../images/FCL_Labs.png')} style={{position: 'absolute', right: 20, bottom: 10}}/>
        </section>


    </div>;
  }
}