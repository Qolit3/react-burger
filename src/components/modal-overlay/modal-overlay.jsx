import React from "react";

import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const reactModals = document.querySelector('#react-modals')


const ModalOverlay = ({ handleClose, ...props }) => {
  const ref = React.useRef(null);

  const handleClick = (e) => {
      return e.target === ref.current && handleClose();
  }

  
  return(
    <div
      ref={ref}
      onClick={handleClick}
      className={props.active
        ? `${styles.overlay} ${styles.overlay_active}` 
        : `${styles.overlay}`}>
            {props.children}
    </div>
      
  )
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func,
  active: PropTypes.bool,
  children: PropTypes.element
}

export default ModalOverlay