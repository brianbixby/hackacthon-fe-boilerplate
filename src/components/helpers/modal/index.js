import React from 'react';

class Modal extends React.Component {
  render() {
    return (
      <div className='modal'>
        <div className='modal-overlay' onClick={this.props.close}></div>
        <div className='modal-wrapper'>
          <div className='modal-close' onClick={this.props.close}></div>
          <div className='modal-header'>
            <h2 className='modal-heading'>{this.props.heading}</h2>
          </div>
          <div className='modal-body'>
            <div className='modal-content'>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;