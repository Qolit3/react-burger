import React from "react";
import './modal.css';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
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

export default Modal