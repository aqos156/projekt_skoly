import React from "react"
import { Button, FormControl } from "react-bootstrap"
import BTable from "react-bootstrap/Table"
import {
  TableOptions,
  useFilters,
  usePagination,
  useSortBy,
  useTable
} from "react-table"

// Our table component
function Table({ columns, data }: TableOptions<any>) {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    // @ts-ignore
    page,
    // @ts-ignore
    canPreviousPage,
    // @ts-ignore
    canNextPage,
    // @ts-ignore
    pageOptions,
    // @ts-ignore
    pageCount,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    nextPage,
    // @ts-ignore
    previousPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data
    },
    useFilters,
    useSortBy,
    usePagination
  )

  // Render the UI for your table
  return (
    <div>
      <BTable bordered hover size="md" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                /* @ts-ignore */
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {/* @ts-ignore */}
                    {column.isSorted
                      ? /* @ts-ignore */
                        column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                  {/* @ts-ignore */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {/* @ts-ignore */}
          {page.map((row, i) => {
            prepareRow(row)
            return (
              /* @ts-ignore */
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </BTable>
      <div className="d-flex align-items-center justify-content-center text-center w-100">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
      </div>
      <div className="d-flex align-items-center justify-content-center text-center w-100">
        <Button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="mx-1">
          {"<<"}
        </Button>{" "}
        <Button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="mx-1">
          {"<"}
        </Button>{" "}
        <Button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="mx-1">
          {">"}
        </Button>{" "}
        <Button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="mx-1">
          {">>"}
        </Button>{" "}
        <FormControl
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(page)
          }}
          style={{ width: "50px" }}
          className="mx-1"
        />
        <FormControl
          as="select"
          custom
          className="mx-1"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
          style={{ maxWidth: 115 }}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </FormControl>
      </div>
    </div>
  )
}

export default Table
