import "react-notifications-component/dist/theme.css"
import ReactNotification from "react-notifications-component"

import React, { useEffect, useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import Table from "./components/Table"
import { customError, getApiURI } from "./helpers"
import { SelectColumnFilter } from "./components/Filters"
import Header from "./components/Header"
import { Navbar } from "react-bootstrap"
import { ClipLoader } from "react-spinners"
import SchoolMap from "./components/SchoolMap"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "./components/Login"
import Axios from "axios"
import { useDispatch } from "react-redux"
import { LOGIN } from "./redux/common"
import Logout from "./components/Logout"
import Register from "./components/Register"

function App() {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [showMap, setShowMap] = useState<boolean>(false)

  const [data, setData] = useState<any>([])

  const [reloadKey, setReloadKey] = useState<any>(0)

  const columns = React.useMemo(
    () => [
      {
        Header: "Škola",
        Filter: SelectColumnFilter,
        accessor: "skola"
      },
      {
        Header: "Obor",
        Filter: SelectColumnFilter,
        accessor: "obor"
      },
      {
        Header: "Město",
        Filter: SelectColumnFilter,
        accessor: "mesto"
      },
      {
        Header: "Počet",
        Filter: SelectColumnFilter,
        accessor: "pocet"
      },
      {
        Header: "Rok",
        Filter: SelectColumnFilter,
        accessor: "rok"
      }
    ],
    []
  )

  const dispatch = useDispatch()

  useEffect(() => {
    Axios(getApiURI("/auth/user"), {
      method: "get",
      withCredentials: true,
      data
    })
      .then((data) => {
        if (data.data?.user) {
          dispatch({ type: LOGIN, payload: data.data.user })
        }
      })
      .catch((e) => {
        //if (e) error.smthBroke();
        customError("Nastala neočekávaná chyba!")
        console.error(e)
      })
  }, [])

  useEffect(() => {
    setLoading(true)

    fetch(getApiURI("/schools"), {
      method: "GET"
    })
      .then((res) => res.json())
      .then((response) => {
        setData(response)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [reloadKey])

  return (
    <Router>
      <div style={{ height: "100vh" }}>
        <ReactNotification />
        <Header
          reloadData={() => setReloadKey(Math.random())}
          toggleShowMap={(v) => setShowMap(v)}
          showMap={showMap}
        />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>

          <Route>
            <div>
              {!showMap ? (
                <div className="container">
                  <Table columns={columns} data={data} />
                  {isLoading ? (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 2,
                        backgroundColor: "rgba(0, 0, 0, 0.2"
                      }}>
                      <div className="d-flex align-items-center justify-content-center">
                        <ClipLoader
                          size={150}
                          color={"#123abc"}
                          loading={isLoading}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <SchoolMap />
              )}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
