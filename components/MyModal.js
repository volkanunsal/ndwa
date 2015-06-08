import React from 'react';
import {Modal, ModalTrigger, Button} from 'react-bootstrap';

export const MyModal = React.createClass({
  render() {
    return (
      <Modal {...this.props} title='Tips' animation={false}>
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

export class OverlayTrigger extends React.Component {
  render(){
    return <ModalTrigger modal={<MyModal {...this.props} />}>
      <a href='javascript:;'>{this.props.anchorText}</a>
    </ModalTrigger>
  }
}

