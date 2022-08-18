import React from "react";
import './modal.css';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const reactModals: any = document.querySelector('#react-modals')





const Modal = ({ handleClose, children, active }: any) => {
  function handleKeydown(e:any) {
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
          <ModalOverlay handleClose={handleClose} active={active}>
              <div className="modal" >
                  { children }
                  <button onClick={handleClose} className="modal__close" >
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
  active: PropTypes.bool,
  children: PropTypes.element
}

export default Modal