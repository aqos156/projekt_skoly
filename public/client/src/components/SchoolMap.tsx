import React, { useEffect, useRef, useState } from "react"
import { render } from "react-dom"
import { Map, Marker, Popup, TileLayer } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { getApiURI } from "../helpers"
//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
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
      style={{ height: "calc(100% - 54px)", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.map((d: any) => (
        <Marker position={[d.lat, d.lng]}>
          <Popup>
            <b>{d.nazev}</b>
          </Popup>
        </Marker>
      ))}
    </Map>
  )
}

export default SchoolMap
