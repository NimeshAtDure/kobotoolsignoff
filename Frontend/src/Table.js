import React from "react";
import { useTable,useRowSelect } from "react-table";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

export default function Table({ columns, data }) {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    state: { selectedRowIds },
    selectedFlatRows
  } = useTable({
    columns,
    data
  },
  useRowSelect,
  // hooks => {
  //   hooks.allColumns.push(columns => [
  //     // Let's make a column for selection
  //     {
  //       id: 'selection',
  //       // The header can use the table's getToggleAllRowsSelectedProps method
  //       // to render a checkbox
  //       Header: ({ getToggleAllRowsSelectedProps }) => (
  //         <div>
  //           <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
  //         </div>
  //       ),
  //       // The cell can use the individual row's getToggleRowSelectedProps method
  //       // to the render a checkbox
  //       Cell: ({ row }) => (
  //         <div>
  //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
  //         </div>
  //       ),
  //     },
  //     ...columns,
  //   ])
  // }
  );

  console.log("rows",selectedFlatRows.map(
    d =>  d.original
  ),selectedRowIds)

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
