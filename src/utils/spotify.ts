import { UserTopArtistsResponse, UserTopTracksResponse } from "../types/spotify"

const ACCOUNTS_PATH = "https://accounts.spotify.com/"
const API_PATH = "https://api.spotify.com/v1/"

export const buildAuthorizeUrl = (state?: string) => {
  let url = `${ACCOUNTS_PATH}authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`
  url += `&response_type=token`
  url += `&redirect_uri=${location.origin}`
  if (state)
    url += `&state=${state}`
  url += "&scope=user-read-private user-top-read"
  return url
}

const fetchWithAuth = (accessToken: string, path: string, config?: RequestInit) => {
  return fetch(`${API_PATH}${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    ...config,
  })
}

export const fetchUserTop = async (accessToken: string, type: 'tracks' | 'artists') => {
  const response = await fetchWithAuth(accessToken, `me/top/${type}`)
  return await response.json() as UserTopTracksResponse | UserTopArtistsResponse
}
