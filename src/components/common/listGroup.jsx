import React from "react";

// Input: The current genre
// Output: onClick Genre
const ListGroup = props => {

  const { items, textProperty, valueProperty, selectedItem, onItemSelect  } = props;
  return(
    <ul className="list-group">
      { items.map(item =>
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={item === selectedItem ? "cursor-pointer list-group-item active" : "cursor-pointer list-group-item"}
        >
          {item[textProperty]}
        </li>
      )}
    </ul>
  )}

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};

export default ListGroup;
