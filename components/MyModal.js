import React from 'react';
import {Modal, ModalTrigger, Button} from 'react-bootstrap';

export const MyModal = React.createClass({
  render() {
    return (
      <Modal {...this.props} title='Hints and Explanations' animation={false} className='modal-vertical-centered'>
        <div className='modal-body'>
          {this.props.modalContent}
        </div>
        <div className='modal-footer'>
          <Button onClick={this.props.onRequestHide}>Close</Button>
        </div>
      </Modal>
    );
  }
});

export class TipTrigger extends React.Component {
  render(){
    return <ModalTrigger modal={<MyModal {...this.props} />}>
      <a href='javascript:;' tabIndex={-1} className='form-hint'>
        <img src={require('../images/light_bulb.png')} style={{width: 15}} />
      </a>
    </ModalTrigger>
  }
}

