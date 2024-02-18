import logo from '@assets/logo.png'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import FormHeader from '../components/FormHeader'
import FormContainer from '../components/Containers/Form'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'

const SignUp = () => {
  return (
    <Container>
      <main className={'h-full flex justify-center items-center'}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  bg-opacity-20 bg-white">
          <FormHeader logo={logo}>
            Bienvenido!
          </FormHeader>

          <FormContainer>
            <form className="space-y-6">
              <div>
                <Label htmlFor="username">Username</Label>
                <div className="mt-2">
                  <Input id="username" name="username" type="text" required={true} />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-2">
                  <Input id="email" name="email" type="email" autoComplete="email" required={true} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                </div>
                <div className="mt-2">
                  <Input id="password" name="password" type="password" required={true} />
                </div>
              </div>

              <div>
                  <Button type="submit">Login</Button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              Ya tienes una cuenta? {' '}
              <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</Link>
            </p>
          </FormContainer>

        </div>
      </main>
    </Container>
  )
}

export default SignUp
