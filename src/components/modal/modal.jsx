import React from "react";
import modal from'./modal.module.css';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const reactModals = document.querySelector('#react-modals')

const Modal = ({ handleClose, children, id, active }) => {
  function handleKeydown(e) {
      return e.key === 'Escape' && handleClose();
  }

  React.useEffect(() => {
      document.addEventListener('keydown', handleKeydown)

      return () => {
          document.removeEventListener('keydown', handleKeydown)
      }
  }, []);
  
  return ReactDOM.createPortal(
      (
          <ModalOverlay active={active} id={id} handleClose={handleClose}>
              <div className={modal.modal}>
                  { children }
                  <button onClick={handleClose} className={modal.close} >
                      <CloseIcon type="primary" />
                  </button>
              </div>
          </ModalOverlay>
      ),
      reactModals
  )
}

Modal.propTypes = {
  handleClose: PropTypes.func,
  children: PropTypes.element
}

export default Modal