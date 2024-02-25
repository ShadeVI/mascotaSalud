import { useEffect, useState } from 'react'

const useFetch = ({ url, method = 'GET', credentials = 'include' }) => {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(url, {
          method,
          credentials
        })
        const data = await res.json()

        if (res.ok && data?.result) {
          setResult(data?.result)
        } else {
          setError(data.error)
        }
      } catch (error) {
        setError(error?.message || 'Error fetch')
      } finally {
        setIsLoading(false)
      }
    }
    fetchAPI()
  }, [url])

  return { result, error, isLoading }
}

export default useFetch
