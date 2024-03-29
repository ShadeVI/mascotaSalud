import styles from './Modal.module.css'
import { MdClose } from 'react-icons/md'

const Modal = ({ handleClose, children }) => {
  return (
    <div className={styles.modal} >
      <div className={styles.modal__content}>
        <div className={styles.modal__closeBtn}><MdClose onClick={handleClose} /></div>
        {children}
      </div>
    </div>
  )
}
export default Modal
