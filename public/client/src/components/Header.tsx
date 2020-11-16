import React, { useState } from "react"
import { Button, Form, Nav, Navbar } from "react-bootstrap"
import CreateYearModal from "./CreateYearModal"

import "bootstrap/dist/js/bootstrap"
import { useUser } from "../redux/hooks"
import { Link } from "react-router-dom"
import CreateSchoolModal from "./CreateSchoolModal"

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
  const [showSchoolModal, setShowSchoolModal] = useState(false)
  const user = useUser()

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
          {user ? (
            <>
              <Button variant="outline-success" onClick={() => setShow(true)}>
                Vytvořit rok
              </Button>
              <Button
                variant="outline-success"
                onClick={() => setShowSchoolModal(true)}>
                Vytvořit školu
              </Button>
              <Link to="/logout" className="btn btn-outline-danger ml-1">
                Odhlásit se (<b>{user.name}</b>)
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-success">
                Přihlásit se
              </Link>
              <Link to="/register" className="btn btn-outline-success">
                Registrovat se
              </Link>
            </>
          )}
        </div>
      </Navbar>
      <CreateYearModal
        show={show}
        onHide={() => {
          setShow(false)
          reloadData()
        }}
      />
      <CreateSchoolModal
        show={showSchoolModal}
        onHide={() => {
          setShowSchoolModal(false)
          reloadData()
        }}
      />
    </>
  )
}

export default Header
