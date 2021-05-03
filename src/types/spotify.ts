export type Artist = {
  external_urls: Record<string, string>;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export type Image = {
  height: number;
  width: number;
  url: string;
}

export type Album = {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: Record<string, string>;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: Record<string, string>;
  external_urls: Record<string, string>;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export type UserTopTracksResponse = {
  items: Track[];
}

export type UserTopArtistsResponse = {
  items: Artist[];
}