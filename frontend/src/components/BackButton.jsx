import { MdArrowBack } from 'react-icons/md'
import styles from './BackButton.module.css'
import { Link } from 'react-router-dom'

const BackButton = ({ route, props }) => {
  return (
    <div className={styles.backLink} {...props}>
      <Link to={route}><MdArrowBack fontSize={'2rem'} /></Link>
    </div>
  )
}
export default BackButton
