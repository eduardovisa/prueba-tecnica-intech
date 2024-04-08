/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useFetch } from '@/utils/api';
import { SearchResults } from './SearchResults';
import { ResultItem } from './ResultItem';

// useRefs timeout

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [albums, setAlbums] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [artist, setArtist] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);
  const [timeOutId, setTimeOutId] = useState(0);

  const fetchAlbum = useFetch({
    params: `method=album.search&album=${searchValue}`,
  });

  const fetchTracks = useFetch({
    params: `method=track.search&track=${searchValue}`,
  });

  const fetchArtists = useFetch({
    params: `method=artist.search&artist=${searchValue}`,
  });

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const timeMout = () => {
    return setTimeout(() => {
      fetchAlbum.fetchData();
      setAlbums(fetchAlbum.data?.results?.albummatches?.album);

      fetchArtists.fetchData();
      setArtist(fetchArtists.data?.results?.artistmatches?.artist);

      fetchTracks.fetchData();
      setTracks(fetchTracks.data?.results?.trackmatches?.track);
    }, 3000);
  };

  useEffect(() => {
    clearTimeout(timeOutId);
    setTimeOutId(timeMout());
    console.log(timeOutId);
  }, [searchValue]);

  return (
    <div>
      <div className="container">
        <div>Realizar una búsqueda: </div>
        <br />
        <input
          className="input-search"
          value={searchValue}
          onChange={handleChange}
        />
      </div>

      {currentElement && (
        <button onClick={() => setCurrentElement(null)}>Volver</button>
      )}

      <br />

      {!currentElement ? (
        <div className="main-container">
          <div>
            <div>Artistas:</div>
            {fetchArtists.isLoading && <span>Cargando artistas...</span>}
            {artist && (
              <SearchResults
                data={artist}
                setCurrentElement={setCurrentElement}
              />
            )}
          </div>

          <div>
            <div>Tracks:</div>
            {fetchTracks.isLoading && <span>Cargando tracks...</span>}
            {tracks && (
              <SearchResults
                data={tracks}
                setCurrentElement={setCurrentElement}
              />
            )}
          </div>

          <div>
            <div>Album:</div>
            {fetchAlbum.isLoading && <span>Cargando albums...</span>}
            {albums && (
              <SearchResults
                data={albums}
                setCurrentElement={setCurrentElement}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="container">
          <ResultItem data={currentElement} />
        </div>
      )}
    </div>
  ); // RETURN
}; // SearchBAR
