//Toolbar for editor textarea
const renderHeader = () => {
  return (
    <span className="ql-formats">
      <select className="ql-header"></select>
      <button className="ql-bold" aria-label="Bold"></button>
      <button className="ql-italic" aria-label="Italic"></button>
      <button className="ql-underline" aria-label="Underline"></button>
      <select className="ql-color"></select>
      <button
        className="ql-list"
        value="ordered"
        aria-label="Ordered List"
      ></button>
      <button
        className="ql-list"
        value="bullet"
        aria-label="Unordered List"
      ></button>
      <select className="ql-align"></select>
      <button className="ql-link" aria-label="Insert Link"></button>
    </span>
  );
};

export const headerTemplate = renderHeader();
