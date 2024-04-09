// Main component
export const SearchResults = ({ data, setCurrentElement }) => {
  let jsxElements = [];

  data.map((element, index) =>
    jsxElements.push(
      <div
        className="button-list"
        key={index}
        onClick={() => setCurrentElement(element)}
      >
        - {element.name}
      </div>
    )
  ); // .map

  return jsxElements; //return
}; // return SerachResults
