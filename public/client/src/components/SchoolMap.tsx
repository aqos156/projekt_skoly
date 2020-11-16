import React, { useEffect, useRef, useState } from "react"
import { render } from "react-dom"
import { Map, Marker, Popup, TileLayer } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { getApiURI } from "../helpers"

var icon = L.icon({
  iconUrl: require("../img/leaf-red.png"),
  shadowUrl: require("../img/leaf-shadow.png"),

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
})

function SchoolMap() {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<any>([])

  const map = useRef<Map>()

  useEffect(() => {
    fetch(getApiURI("/schools/positions"), {
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
  }, [])

  return (
    <Map
      center={[49.7789766, 15.612118]}
      zoom={9}
      // @ts-ignore
      ref={map}
      style={{ height: "calc(100vh - 54px)", width: "100vw" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.map((d: any) => (
        <Marker position={[d.lat, d.lng]} icon={icon}>
          <Popup>
            <b>{d.nazev}</b>
          </Popup>
        </Marker>
      ))}
    </Map>
  )
}

export default SchoolMap
