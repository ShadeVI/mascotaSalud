import styles from './Select.module.css'

const Select = ({ onChange, options, children, ...props }) => {
  return (
    <select className={styles.select} onChange={onChange} {...props }>
      {options.map(({ value, displayText }, index) => {
        return (<option key={index} disabled={index === 0} value={value}>{displayText}</option>)
      })}
    </select>
  )
}
export default Select
