import React, { useEffect, useState } from "react"
import cookie from "cookie"
import SpotifyTrack from "../components/SpotifyTrack"
import { useAccessToken } from "../hooks/use-access-token"
import { Track, UserTopTracksResponse } from "../types/spotify"
import { randomString } from "../utils/random-string"
import { buildAuthorizeUrl, fetchUserTop } from "../utils/spotify"

const IndexPage = () => {
  const [accessToken, error] = useAccessToken()
  const [data, setData] = useState<Track[] | undefined>(undefined)

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
    const json = await fetchUserTop(accessToken!!, "tracks") as UserTopTracksResponse
    setData(json.items)
  }

  return (
    <div>
      {!accessToken && <button onClick={authenticate}>authenticate</button>}
      {data && <div>
        {data.map((track, index) => (
          <SpotifyTrack track={track} key={index}/>
        ))}
      </div>}
      {error && <b>{error}</b>}
    </div>
  );
}

export default IndexPage
