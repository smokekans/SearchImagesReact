import { Overlay, ModalWraper } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', onCloseModal);

    return () => {
      window.removeEventListener('keydown', onCloseModal);
    };
  });

  const onCloseModal = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const onCloseModalOnBackdrop = evt => {
    if (evt.targat === evt.currentTerget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={onCloseModalOnBackdrop}>
      <ModalWraper>{children}</ModalWraper>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};
