import { Album, UserTopResponse } from "../types/spotify"

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

export const fetchUserTop = async (
  accessToken: string,
  type: 'tracks' | 'artists',
  timeRange: 'long' | 'medium' | 'short' = 'medium',
  limit = 20,
  offset = 0,
) => {
  const response = await fetchWithAuth(accessToken, `me/top/${type}?time_range=${timeRange}_term&limit=${limit}&offset=${offset}`)
  return await response.json() as UserTopResponse
}

export const getAlbumImage = (album: Album) => {
  return album.images.sort((imageLeft, imageRight) => {
    return imageRight.width - imageLeft.width;
  })[0];
}

