import { Track } from "../types/spotify"

type Props = {
  track: Track;
}

const SpotifyTrack = ({ track }: Props) => {
  return (
    <div style={{marginBottom: '8px'}}>
      <b>{track.name}</b><br/>
      <small>{track.artists[0].name}</small>
    </div>
  )
}

export default SpotifyTrack