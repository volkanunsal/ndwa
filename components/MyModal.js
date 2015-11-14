import React from 'react';
import {Modal, ModalTrigger, Button} from 'react-bootstrap';
import {Link} from 'react-router';

export const MyModal = React.createClass({
  render() {
    return (
      <Modal {...this.props} title='Hints and Explanations' animation={false} className='modal-vertical-centered'>
        <div className='modal-body' style={{fontSize: '16px'}}>
          {this.props.modalContent}
        </div>
        <div className='modal-footer'>
          <Button onClick={this.props.onRequestHide}>Close</Button>
        </div>
      </Modal>
    );
  }
});

export const FirstTimeModal = React.createClass({
  hide(){
    console.log('hi')
  },
  render() {
    return (
      <Modal {...this.props} animation={false} className='welcome-modal ' bsSize='large'>
        <div className='modal-body'>
          <a href='javascript:;' onClick={this.props.onRequestHide} style={{color: 'white', position: 'absolute', right: 10, top: 10}}>
            <img src={require('../images/x.png')} />
          </a>
          {this.props.modalContent}
        </div>
      </Modal>
    );
  }
});

export class FirstTimeTrigger extends React.Component {
  componentDidMount(){
    React.findDOMNode(this.refs.btn).click()
  }
  render(){
    return <ModalTrigger ref='btn' modal={<FirstTimeModal {...this.props} />}>
      <a href='javascript:;' tabIndex={-1}></a>
    </ModalTrigger>
  }
}

export class TipTrigger extends React.Component {
  render(){
    return <ModalTrigger modal={<MyModal {...this.props} />}>
      <a href='javascript:;' tabIndex={-1} className='form-hint'>
        <img src={require('../images/light_bulb.png')} style={{width: 15}} />
      </a>
    </ModalTrigger>
  }
}

