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
    setAudio(audio)

    audio.oncanplaythrough = () => {
      startPlaying(audio)
    }
    audio.onended = () => setState(PlaybackState.NOT_PLAYING)
  }

  const startPlaying = (audio?: HTMLAudioElement) => {
    setState(PlaybackState.PLAYING)
    audio?.play()
  }

  const play = useCallback(() => {
    if (state != PlaybackState.UNLOADED) {
      startPlaying(audio)
    } else {
      loadAudio()
    }
  }, [state, audio])

  const pause = useCallback(() => {
    if (state != PlaybackState.UNLOADED) {
      audio?.pause()
      setState(PlaybackState.NOT_PLAYING)
    }
  }, [state])

  const toggle = useCallback(() => {
    if (state != PlaybackState.UNLOADED) {
      if (state === PlaybackState.NOT_PLAYING) {
        startPlaying(audio)
      } else {
        pause()
      }
    } else {
      loadAudio()
    }
  }, [state, audio])

  const controls = {
    play,
    pause,
    toggle,
  }

  return [state, controls] as const
}
