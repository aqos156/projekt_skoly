import React, { useState } from "react"
import { Button, Form, Nav, Navbar } from "react-bootstrap"
import CreateYearModal from "./CreateYearModal"

import "bootstrap/dist/js/bootstrap"

function Header({
  reloadData,
  toggleShowMap,
  showMap
}: {
  reloadData: () => any
  toggleShowMap: (v: boolean) => any
  showMap: boolean
}) {
  const [show, setShow] = useState(false)

  return (
    <>
      <Navbar className="bg-light justify-content-between">
        <Nav className="mr-auto">
          <Nav.Item>
            <Form.Check
              type="switch"
              id="test"
              label="Zobrazit mapu"
              checked={showMap}
              // @ts-ignore
              onChange={(e) => toggleShowMap(e.target.checked)}
            />
          </Nav.Item>
        </Nav>
        <div className="justify-content-end">
          <Button variant="success" onClick={() => setShow(true)}>
            Vytvořit rok
          </Button>
        </div>
      </Navbar>
      <CreateYearModal
        show={show}
        onHide={() => {
          setShow(false)
          reloadData()
        }}
      />
    </>
  )
}

export default Header
