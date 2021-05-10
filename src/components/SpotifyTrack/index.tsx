import { useMemo } from "react"
import { PlaybackState, useAudio } from "../../hooks/use-audio"
import { Track } from "../../types/spotify"
import { getAlbumImage } from "../../utils/spotify"
import styles from "./styles.module.css"

type Props = {
  track: Track;
}

const SpotifyTrack = ({ track }: Props) => {
  const album = track.album
  const image = useMemo(() => getAlbumImage(album), [album]);
  const [state, controls] = useAudio(track.preview_url);

  const previewButtonText = useMemo(() => {
    switch (state) {
      case PlaybackState.UNLOADED:
      case PlaybackState.NOT_PLAYING:
        return "Preview"
      case PlaybackState.LOADING:
        return "Loading..."
      case PlaybackState.PLAYING:
        return "Stop"
    }
  }, [state])

  return (
    <div className={styles.root}>
      <div className={styles.albumImage}>
        <img src={image.url} alt={album.name}/>
        <button onClick={controls.toggle} disabled={state === PlaybackState.LOADING}>{previewButtonText}</button>
      </div>
      <div>
        <a href={track.external_urls.spotify}>{track.name}</a>
        <div>
          <span>{track.artists[0].name}</span>
        </div>
      </div>
    </div>
  )
}

export default SpotifyTrack