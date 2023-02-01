import React, { FunctionComponent } from "react";
import modal from'./modal.module.css';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IModalProps } from "../../types-and-interfacese/interfaces";

const reactModals = document.querySelector('#react-modals') as Element | DocumentFragment

const Modal: FunctionComponent<IModalProps> = ({ handleClose, children, id, active }) => {
  function handleKeydown(e: KeyboardEvent) {
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

export default Modal