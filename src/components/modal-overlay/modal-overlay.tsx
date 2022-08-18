import React from "react";
import ReactDOM from "react-dom";
import './modal-overlay.css';
import PropTypes from 'prop-types';

const reactModals: any = document.querySelector('#react-modals')


const ModalOverlay = ({ handleClose, ...props }:any) => {
  const ref = React.useRef(null);

  const handleClick = (e: any) => {
      return e.target === ref.current && handleClose();
  }

  
  return ReactDOM.createPortal(
      (
          <div
          ref={ref}
          onClick={handleClick}
          className={props.active
            ? "modal-overlay modal-overlay_active" 
            : "modal-overlay"}
          >
            {props.children}
          </div>
      ),
      reactModals
  )
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func,
  active: PropTypes.bool,
  children: PropTypes.element
}

export default ModalOverlay