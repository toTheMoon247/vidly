import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
  /*
    If, for example, page size = 4 so:
    Page 1 --> startIndex = 0. For page 2 ---> startIndex will be 4, and so on.
  */
  const startIndex = (pageNumber -1) * pageSize;

  // Wrap lodash object around items
  let lodashItems = _(items);
  lodashItems = lodashItems.slice(startIndex).take(pageSize);

  // Unwrap lodash object back to a standard array
  items = lodashItems.value();
  return items;
}
