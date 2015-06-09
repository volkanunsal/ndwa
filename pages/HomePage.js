import React from 'react';
import {Link} from 'react-router';
var basePath = '/';

export default class SectionPage extends React.Component {
  render() {
    return <div style={{position: 'relative'}}>
      <a className='logo' style={{position: 'absolute', left: 0, top: 0, height: 50, width: 50, marginBottom: 0}}>
        <img src={require('../images/logo.png')}/>
      </a>
      <div style={{backgroundColor:'white', marginBottom: 0, height: 650, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div>
          <h4 className='text-center'>In-House Agreements: Generate your own work agreement effortlessly.</h4>
          <div className='container' style={{position: 'relative'}}>
            <h2 className='text-center'>Did you know that as of April 1st, 2015 Massachusetts requires a written agreement if you employ or you are employed as a domestic worker?</h2>
            <img src={require('../images/plane.png')} style={{position: 'absolute', top: -80, right: -50}} className='visible-lg visible-md'/>
          </div>


          <div style={{display: 'flex', justifyContent: 'center'}}>
            <ul className='list-inline'>
              <li><a href={basePath + '#create'} className='btn btn-link btn-lg' style={{borderRadius: 0, border: 'solid 1px black', color: 'black'}}>No, I Didn’t</a></li>
              <li><a href={basePath + '#create'} className='btn btn-link btn-lg' style={{borderRadius: 0, border: 'solid 1px black', color: 'black'}}>Yes, I Did</a></li>
            </ul>
          </div>
        </div>
      </div>

      <a name='create' />
      <div style={{backgroundColor: '#66666f', color: 'white', marginBottom: 0, height: 800, fontSize: '2em', paddingTop: 40}}>
        <h1 className='text-center'> Create, Comply and Print!</h1>
        <h3 className='text-center'>Constructing your own work agreement just got easier.</h3>

        <ul style={{width: 1000, margin: '80px auto'}}>
          <li>
            It’s Straightforward.
            <br/>
            We use plain language not legalese, because agreements can be daunting and confusing.
          </li>

          <li>
            It Helps You Comply with the Law.
            <br/>
            We work with the folks who helped implement the Bill of Rights, because agreements can feel complicated.
          </li>

          <li>
            It Improves Communication.
            <br/>
            You can avoid problems in the future, because agreements resolve potential conflicts at the outset.
          </li>
        </ul>
      </div>
      <div style={{backgroundColor: '#ffe599', marginBottom: 0, height: 600, fontSize: '2em', paddingTop: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div>
          <h1 className='text-center'>How does it work?</h1>
          <ol style={{width: 1000, margin: '0 auto'}}>
            <li>Click “I Need an Agreement”</li>
            <li>Step-by-Step you’ll find the information you need, right at your fingertips</li>
            <li>Complete the agreement to fit your situation.</li>
            <li>CONGRATS! You’re done. Print your agreement.</li>
          </ol>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 40}}>
            <Link to='section' style={{borderRadius: 0, border: 'solid 1px black', color: 'black', fontSize: '1.6em'}} className='btn btn-link btn-lg' params={{sectionName: 1}}>I Need an Agreement!</Link>
          </div>
        </div>
      </div>

      <div className='jumbotron' style={{backgroundColor: 'white', marginBottom: 0}}>
        <h2 className='text-center'>About the Project</h2>
        <div className='container'>
          <p>{"We imagined In-house Agreements as a tool that makes it easier to create a work agreement. As a non-profit venture of Fair Care Labs, we are always looking for innovative ways to solve problems facing domestic workers and their employers. With Massachusetts’ new requirement for a written work agreement, we wondered: how will employers and employees, without HR departments of their own, create agreements that comply with the law? We looked around and found sample work agreements, helpful hints, and places to get started, but we wanted more."}</p>
          <p>{"We think that the process of creating an agreement should be friendly, easy to understand, informative and feel inclusive. You should know or have access to both parties’ rights and responsibilities as you create your document, and it should be written simply and clearly so you can make informed decisions about your working relationship. It’s time that creating a contract makes sense to everyone, so you can agree amicably, easily and with dignity, like you wanted all along."}</p>
          <h4 className='text-center'>If you think everyone should find it easier to agree, then share the crap outta me</h4>
        </div>

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <ul className='list-inline' style={{alignSelf: 'center'}}>
            <li><a className='btn btn-link btn-lg' style={{borderRadius: 0, border: 'solid 1px black', color: 'black'}}>Email addy</a></li>
            <li><a className='btn btn-link btn-lg' style={{borderRadius: 0, border: 'solid 1px black', color: 'black'}}>Stay in touch</a></li>
          </ul>
        </div>
      </div>
      <div style={{backgroundColor: '#d89f39', marginBottom: 0, paddingBottom: 40}}>
        <div className='text-center' style={{position: 'relative', top: -40}} >
          <img src={require('../images/logo2.png')} />
        </div>
        <h3 className='text-center' style={{marginTop:0}}>
          Partners
          <br/>
          NDWA, HIH, MDWC
        </h3>

      </div>
      <div style={{backgroundColor: 'white', marginBottom: 0, fontSize: '2em', paddingTop: 40, paddingBottom: 120}}>
        <h1 className='text-center'>
          TOS
        </h1>
        <div className='container'>
          <p>{"Disclaimer: You can use the ideas/terms set forth in the sample agreement on the website to create your own agreement. Be sure to complete/fill in your agreement to fit your own situation, and be as specific as possible about benefits, time off, rights and obligations, and so on."}</p>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 40}}>
          <Link to='section' style={{borderRadius: 0, border: 'solid 1px black', color: 'black', fontSize: '1.6em'}} className='btn btn-link btn-lg' params={{sectionName: 1}}>Get Started</Link>
        </div>
      </div>
    </div>;
  }
}