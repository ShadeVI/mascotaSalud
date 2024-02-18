const FormHeader = ({ children, logo }) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mx-auto h-32 w-32 rounded-full overflow-hidden">
            <img src={logo} alt="Mascota Salud logo" className="h-full mx-auto" />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {children}
          </h2>
        </div>
  )
}
export default FormHeader
