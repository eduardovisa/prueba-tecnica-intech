/* eslint-disable react-hooks/exhaustive-deps */
// imports -> general
import { useEffect, useState } from 'react';
// imports -> functions
import { useFetch } from '@/utils/api';
// imports -> components
import { ResultItem } from './ResultItem';
import { SearchResults } from './SearchResults';

const ListContainer = ({ fetchData, label, data, setCurrentElement }) => {
  return (
    <div>
      <div className="title-list">{label}:</div>
      <hr style={{ paddingBottom: '15px' }} />
      {fetchData.isLoading && <span>Cargando ${label.toLowerCase()}...</span>}
      {data ? (
        <SearchResults data={data} setCurrentElement={setCurrentElement} />
      ) : (
        <span>No se encoentró información</span>
      )}
    </div>
  ); // return
}; // ListContainer

// Main component
export const SearchBar = () => {
  // states
  const [searchValue, setSearchValue] = useState('');
  const [albums, setAlbums] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [artist, setArtist] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);

  const fetchAlbums = useFetch({
    params: `method=album.search&album=${searchValue}`,
  }); // fetchAlbum
  const fetchTracks = useFetch({
    params: `method=track.search&track=${searchValue}`,
  }); // fetchtTracks
  const fetchArtists = useFetch({
    params: `method=artist.search&artist=${searchValue}`,
  }); // fetchArtists

  // function -> handleChange
  const handleChange = (e) => setSearchValue(e.target.value);

  // useEffect
  useEffect(() => {
    fetchAlbums.fetchData();
    setAlbums(fetchAlbums.data?.results?.albummatches?.album);

    fetchArtists.fetchData();
    setArtist(fetchArtists.data?.results?.artistmatches?.artist);

    fetchTracks.fetchData();
    setTracks(fetchTracks.data?.results?.trackmatches?.track);
  }, [searchValue]);

  // View
  return (
    <div>
      <p className="title">| TIntech Prueba Tecnica |</p>
      <div className="container-header">
        <p>* Realizar una búsqueda: </p>
        <input
          className="input-search"
          value={searchValue}
          onChange={handleChange}
          disabled={currentElement}
        />

        {currentElement && (
          <button
            className="button-return"
            onClick={() => setCurrentElement(null)}
          >
            Volver
          </button>
        )}
      </div>

      {!currentElement ? (
        <div className="container-content">
          <ListContainer
            data={artist}
            fetchData={fetchArtists}
            label="Artistas"
            setCurrentElement={setCurrentElement}
          />

          <ListContainer
            data={albums}
            fetchData={fetchAlbums}
            label="Albums"
            setCurrentElement={setCurrentElement}
          />

          <ListContainer
            data={tracks}
            fetchData={fetchTracks}
            label="Canciones"
            setCurrentElement={setCurrentElement}
          />
        </div>
      ) : (
        <div className="container-content">
          <ResultItem data={currentElement} />
        </div>
      )}
    </div>
  ); // RETURN
}; // SearchBAR
