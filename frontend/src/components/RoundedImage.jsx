import styles from './RoundedImage.module.css'

const RoundedImage = ({ src, alt, width, height, borderRadius = 'initial' }) => {
  return (
    <div className={styles.wrapper} style={{ width, height, borderRadius }}>
      <img src={src} alt={alt} />
    </div>
  )
}
export default RoundedImage
