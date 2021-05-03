import React, { useEffect, useState } from "react"
import cookie from "cookie"
import { useAccessToken } from "../hooks/use-access-token"
import { randomString } from "../utils/random-string"
import { buildAuthorizeUrl, fetchUserTop } from "../utils/spotify"

const IndexPage = () => {
  const accessToken = useAccessToken()
  const [data, setData] = useState<any>(undefined)

  useEffect(() => {
    if (accessToken) {
      fetchData()
    }
  }, [accessToken])

  const authenticate = async (event: React.MouseEvent) => {
    event.preventDefault()

    const state = randomString(20)
    document.cookie = cookie.serialize("auth-state", state, {
      secure: true,
      sameSite: true,
    })

    window.location.href = buildAuthorizeUrl(state)
  };

  const fetchData = async () => {
    const json = await fetchUserTop(accessToken!!, "tracks")
    setData(json)
  }

  return (
    <div>
      {!accessToken && <button onClick={authenticate}>authenticate</button>}
      {data && <pre>{JSON.stringify(data, undefined, 2)}</pre>}
    </div>
  );
}

export default IndexPage
