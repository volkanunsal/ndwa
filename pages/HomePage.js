import React from 'react';
import {Link} from 'react-router';
var basePath = '/';
import EmailSignUp from '../components/EmailSignUp';
import $script from 'scriptjs';
import {FirstTimeTrigger} from '../components/MyModal';



export default class SectionPage extends React.Component {

  componentDidMount(){
    // TODO: redirect to section/1

    window.switchTo5x = true;
    $script('http://w.sharethis.com/button/buttons.js', function(){
      stLight.options({publisher: "126f4359-08ea-4054-a9af-defe6a39880a", doNotHash: false, doNotCopy: false, hashAddressBar: false});
    });

    // ['hs-01', 'hs-02', 'hs-03'].forEach(id => {
    //   React.findDOMNode(this.refs[id]).setAttribute('style', 'height:'+window.outerHeight+'px')
    // });
  }

  render() {
    return <div>
        <section ref='hs-00' id='hs-00' className='bg-brand-blue clearfix'>
          <div className='hero'>
            <img src={require('../images/home_01.png')} className='home-logo'/>
            <div className='tagline-wrapper'>
              <p className='tagline'>Take care of the people who take care of your family</p>
            </div>
          </div>
          <div className='home-band text-center'>Use our online tool to easily create your own work agreement.</div>
        </section>

        <section ref='hs-01' id='hs-01' className='home-section clearfix bg-white'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-sm-12 col-md-12 text-center'>
                <p>
                  <img src={require('../images/favi_inhouse_red.png')} width='64px'/>
                </p>
                <p>Nannies are among the most important people to your family. They clean up the spills and make sure naptime happens like clockwork, but while they are caring for your family are you taking care of them?</p>
                <p>Having a written agreement with your nanny is one of the easiest ways to take a meaningful step in taking care of her. And we've made it so simple you'll be done in 20 minutes!</p>
                <Link to='section' params={{sectionName: '1'}} className='btn btn-link btn-lg btn-custom'>
                  Get Started!
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section ref='hs-03' id='hs-03' className='home-section clearfix bg-brand-black'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-6 col-md-6 text-center'>
                <img src={require('../images/pencil_paper_main.png')} className='pencil-paper'/>
              </div>
              <div className='col-lg-6 col-md-6'>
                <div className='section-body'>
                  <h2>How it works</h2>
                  <p>Helpful comments will guide you as you check a box here or fill in a blank there.</p>
                  <p>Need more insight? Click on one of the light bulbs <img src={require('../images/light_bulb_small.png')}/> to find further information.</p>
                  <p>All done? You are ready to PRINT your own work agreement!</p>
                </div>
                <div className='text-center'>
                  <Link to='section' params={{sectionName: '1'}} className='btn btn-link btn-lg btn-custom'>
                    Get Started!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section ref='hs-07' id='hs-07' className='home-section clearfix bg-white'>
          <div className='container'>
            <h2>Additional Information</h2>
            <p>
              If you’d like to learn more about the Massachusetts requirement for a written work agreement, or more information about the Bill of Rights in general, we suggest you check out the following resources
            </p>
            <ul>
              <li>
                <img src={require('../images/light_bulb_small.png')}/> <a target='_blank' href='http://www.mass.gov/ago/doing-business-in-massachusetts/labor-laws-and-public-construction/domestic-workers/'>Learn more about the new Massachussets regulations</a></li>
              <li>
                <img src={require('../images/light_bulb_small.png')}/> <a target='_blank' href='http://static1.squarespace.com/static/546dde9ae4b0d7784fd2a0a5/t/54e655f8e4b0e3df8c057ab9/1424381432739/CHECKLIST+for+Employers.pdf'>Review the terms or conditions of employment</a></li>
              <li>
                <img src={require('../images/light_bulb_small.png')}/> <a target='_blank' href='http://domesticemployers.org/the-checklist/'>Find out more about being a fair employer.</a></li>
            </ul>
            <div className='row partners'>
              <h2>Our Partners</h2>
              <div className='col-lg-6 col-md-6 col-sm-12 partner-slot'>
                <a href='http://www.domesticworkers.org/' target='_blank'>
                  <img width='150px' src={require('../images/ndwa_slate.png')} className='img-responsive'/>
                </a>
                <a href='http://domesticemployers.org/' target='_blank'>
                  <img width='150px' src={require('../images/HIH_slate.png')} className='img-responsive'/>
                </a>
                <a href='http://www.massdomesticworkers.org' target='_blank'>
                  <img width='150px' src={require('../images/MCDW_slate.png')} className='img-responsive'/>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section ref='hs-04' id='hs-04' className='home-section clearfix bg-brand-red'>
           <div className='container'>
            <div className='row' style={{paddingBottom: 40}}>
              <div className='col-lg-6 col-md-6 share-block'>
                <div className='share'>
                  <h2>Share!</h2>
                  <span className='st_facebook_custom' displayText='Facebook'/>
                  <span className='st_email_custom' displayText='Email'/>
                  <span className='st_twitter_custom' displayText='Tweet'/>
                </div>

              </div>
              <div className='col-lg-6 col-md-6'>
                <p>We’re just getting started! Sign-up for news and updates</p>
                <EmailSignUp/>
              </div>
            </div>
          </div>
        </section>
        <section ref='hs-05' id='hs-05' className='home-section clearfix bg-brand-blue'>
          <div className='container'>
            <h2>About the project</h2>
            <p>
              We imagined In-House Agreements as a tool that makes it easier to create a work agreement. As a non-profit venture of <a href='http://www.faircarelabs.org/' target='_blank'>Fair Care Labs</a>, we are always looking for innovative ways to solve problems facing domestic workers and their employers. With Massachusetts' new requirement for a written work agreement, we wondered: how will employers and employees, without HR departments of their own, create agreements that comply with the law?
            </p>
            <p>
              We think that the process of creating an agreement should be friendly, easy to understand,
              informative and feel inclusive. You should know or have access to both parties’ rights and
              responsibilities as you create your document, and it should be written simply and clearly so you can
              make informed decisions about your working relationship. It’s time that creating a contract makes
              sense to everyone, so you can agree amicably, easily and with dignity, like you wanted all along.
            </p>
            <hr/>
            <p className='disclaimer'>{'Disclaimer: You can use the ideas/terms set forth in the sample agreement on the website to create your own agreement. Be sure to complete/fill in your agreement to fit your own situation, and be as specific as possible about benefits, time off, rights and obligations, and so on.'}
            </p>
          </div>
          <img src={require('../images/FCL_Labs.png')} className='footer-logo' />
        </section>
    </div>;
  }
}