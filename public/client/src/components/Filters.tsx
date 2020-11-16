import React from "react"
import { Form } from "react-bootstrap"

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
  // @ts-ignore
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id])
    })
    // @ts-ignore
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <Form.Control
      as="select"
      value={filterValue}
      custom
      onChange={(e) => {
        setFilter(e.target.value || undefined)
      }}>
      <option value="">Vše</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </Form.Control>
  )
}
