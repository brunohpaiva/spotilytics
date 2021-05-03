import cookie from "cookie"
import { useEffect, useState } from "react"

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!process.browser)
      return

    const hash = window?.location?.hash?.substring(1)
    if (!hash || hash.length === 0)
      return

    const params = new URLSearchParams(hash)
    const accessToken = params.get("access_token")
    const state = params.get("state")
    const stateCookie = cookie.parse(document.cookie)["auth-state"]

    if (!accessToken || !state || state != stateCookie) {
      setAccessToken(undefined)
      setError("Invalid access token or state code.")
      return
    }

    setAccessToken(accessToken)
  }, [process.browser && window?.location?.hash])

  return [accessToken, error] as const
}