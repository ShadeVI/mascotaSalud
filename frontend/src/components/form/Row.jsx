import Input from '../Input'
import Label from './Label'

const Row = ({ labelText }) => {
  return (
    <div>
      <Label idInput='username' text='Username' />
      <Input />
    </div>
  )
}
export default Row
