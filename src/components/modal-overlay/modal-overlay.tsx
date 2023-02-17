import React, { FunctionComponent } from "react";
import { IModalOverlayProps } from "../../types-and-interfacese/interfaces";
import styles from './modal-overlay.module.css';


const ModalOverlay: FunctionComponent<IModalOverlayProps> = ({ handleClose, id, active, children }) => {
  const ref = React.useRef(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      return e.target === ref.current && handleClose();
  }
  
  return(
    <div id={id}
      ref={ref}
      onClick={handleClick}
      className={active
        ? `${styles.overlay} ${styles.overlay_active}` 
        : `${styles.overlay}`}>
            {children}
    </div>
      
  )
}

export default ModalOverlay