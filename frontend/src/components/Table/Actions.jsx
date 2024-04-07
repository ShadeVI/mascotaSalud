import { MdDelete, MdEdit } from 'react-icons/md'
import styles from './Actions.module.css'

const Actions = ({ ID, handleEdit, handleDelete }) => {
  return (
    <div className={styles.actions}>
      <div><MdEdit onClick={() => handleEdit(ID)} /></div>
      <div><MdDelete onClick={() => handleDelete(ID)} /></div>
    </div>
  )
}
export default Actions
