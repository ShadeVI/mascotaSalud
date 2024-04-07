import { MdDelete, MdEdit } from 'react-icons/md'
import styles from './Actions.module.css'

const Actions = ({ handleEdit, handleDelete }) => {
  return (
    <div className={styles.actions}>
      <div><MdEdit onClick={handleEdit} /></div>
      <div><MdDelete onClick={handleDelete} /></div>
    </div>
  )
}
export default Actions
