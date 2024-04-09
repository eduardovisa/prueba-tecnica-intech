/* eslint-disable @next/next/no-img-element */

const ListItem = ({ label, data }) => {
  return (
    <div>
      <span style={{ fontWeight: 'bold', color: 'weat' }}>{label}:</span> {data}
    </div>
  ); // return
}; // ListItem

// Main component
export const ResultItem = ({ data }) => {
  return (
    <div className="container-element">
      <img
        src={data.image[3]['#text']}
        alt="img"
        style={{ paddingBottom: '5px' }}
      />
      <ListItem label="Nombre" data={data.name} />
      <ListItem label="Artista" data={data.artist} />
      <ListItem label="URL" data={data.url} />
    </div>
  ); // return
}; // ResultItems
