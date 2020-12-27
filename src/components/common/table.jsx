import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

// The props define the interface of the component
const Table = ({ columns, sortColumn, onSort, data }) => {

  return(
    <table className="table ml-3">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort}/>
      <TableBody columns={columns } data={data}/>
    </table>
  );
}

export default Table;
