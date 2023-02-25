import { Overlay, ModalWraper } from './Modal.styled';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseModal);
  }

  onCloseModal = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onCloseModalOnBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.onCloseModalOnBackdrop}>
        <ModalWraper>{this.props.children}</ModalWraper>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};
