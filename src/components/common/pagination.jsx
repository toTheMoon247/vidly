import React from "react";
import _ from 'lodash';

// Input = The current page
// Output = onClick of the number of pagination

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  // This are the number of pages needed in the pagination element
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);


  return(
    <nav>
      <ul className="pagination">
        {pages.map(page =>(
          <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
            <a onClick={() => onPageChange(page)} className="page-link cursor-pointer">{page}</a>
          </li>
        ))}
      </ul>
  </nav>
  )
}

export default Pagination;