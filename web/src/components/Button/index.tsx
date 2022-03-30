import Spinner from "../Spinner"

const FormButton = ({className, loading, text}: {className?: string, loading?: boolean, text: string} ) => (
  <button
    type="submit"
    className={`px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${className}`}
  >
    {
      loading ?
      <Spinner /> :
      <span>{text}</span>
    }
  </button>
)

export default FormButton