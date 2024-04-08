export const SearchResults = ({ data, setCurrentElement }) => {
  let jsxElements = [];

  data.map((element, index) =>
    jsxElements.push(
      <div key={index} onClick={() => setCurrentElement(element)}>
        {element.name}
      </div>
    )
  );

  return jsxElements;
};
