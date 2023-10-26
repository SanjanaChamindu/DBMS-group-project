import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTable } from 'react-table';

const generateData = (start, length = 20) =>
  Array.from({ length }).map((_, i) => ({
    id: start + i,
    typeOfLeaves: `Type ${i}`,
    leavesTaken: i * 2,
    leavesRemaining: 20 - i * 2,
  }));

const AbsenceFunc = () => {
  const [items, setItems] = useState(generateData(0));

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        ...generateData(prevItems.length),
      ]);
    }, 1500);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Type of Leaves',
        accessor: 'typeOfLeaves',
      },
      {
        Header: 'Leaves Taken',
        accessor: 'leavesTaken',
      },
      {
        Header: 'Leaves Remaining',
        accessor: 'leavesRemaining',
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: items });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      ></div>
      <div id='scrollableDiv' style={{ height: '80vh', overflow: 'auto' }}>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={true}
          scrollableTarget='scrollableDiv'
        >
          <table {...getTableProps()} className='table table-striped'>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default AbsenceFunc;
