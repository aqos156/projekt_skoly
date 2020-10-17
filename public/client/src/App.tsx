import React, { useEffect, useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import Table from "./components/Table"
import { getApiURI } from "./helpers"
import { SelectColumnFilter } from "./components/Filters"
import Header from "./components/Header"
import { Navbar } from "react-bootstrap"
import { ClipLoader } from "react-spinners"
import SchoolMap from "./components/SchoolMap"

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
    <div style={{ height: "100vh" }}>
      <Header
        reloadData={() => setReloadKey(Math.random())}
        toggleShowMap={(v) => setShowMap(v)}
        showMap={showMap}
      />
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
                <ClipLoader size={150} color={"#123abc"} loading={isLoading} />
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <SchoolMap />
      )}
    </div>
  )
}

export default App
