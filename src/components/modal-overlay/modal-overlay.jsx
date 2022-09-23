import React from "react";
import { useSelector } from 'react-redux'

import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const reactModals = document.querySelector('#react-modals')


const ModalOverlay = ({ handleClose, ...props }) => {
  const ref = React.useRef(null);

  const handleClick = (e) => {
      return e.target === ref.current && handleClose();
  }

  const active = useSelector(state => state.other.modalStatus)
  
  return(
    <div
      ref={ref}
      onClick={handleClick}
      className={active
        ? `${styles.overlay} ${styles.overlay_active}` 
        : `${styles.overlay}`}>
            {props.children}
    </div>
      
  )
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func,
  children: PropTypes.element
}

export default ModalOverlay