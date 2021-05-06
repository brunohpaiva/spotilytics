import { useCallback, useState } from "react"

export enum PlaybackState {
  UNLOADED,
  LOADING,
  PLAYING,
  NOT_PLAYING,
}

export const useAudio = (url: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined)
  const [state, setState] = useState<PlaybackState>(PlaybackState.UNLOADED)

  const loadAudio = () => {
    const audio = new Audio(url)
    setState(PlaybackState.LOADING)
    audio.oncanplaythrough = startPlaying
    audio.onended = () => setState(PlaybackState.NOT_PLAYING)
    setAudio(audio)
  }

  const startPlaying = () => {
    setState(PlaybackState.PLAYING)
    audio?.play()
  }

  const play = useCallback(() => {
    if (state != PlaybackState.UNLOADED) {
      startPlaying()
    } else {
      loadAudio()
    }
  }, [state])

  const pause = useCallback(() => {
    if (state != PlaybackState.UNLOADED) {
      audio?.pause()
      setState(PlaybackState.NOT_PLAYING)
    }
  }, [state])

  const toggle = useCallback(() => {
    if (state != PlaybackState.UNLOADED) {
      if (state === PlaybackState.NOT_PLAYING) {
        startPlaying()
      } else {
        pause()
      }
    } else {
      loadAudio()
    }
  }, [state])

  const controls = {
    play,
    pause,
    toggle,
  }

  return [state, controls] as const
}
