import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { customError, getApiURI, customSuccess } from "../helpers"
import { LOGOUT } from "../redux/common"
import { useUser } from "../redux/hooks"

function Logout() {
  const { register, handleSubmit, watch, errors } = useForm()

  const user = useUser()

  const dispatch = useDispatch()

  useEffect(() => {
    Axios(getApiURI("/auth/logout"), {
      method: "post",
      withCredentials: true
    })
      .then((data) => {
        console.log(data)
        if (data.data) {
          dispatch({ type: LOGOUT, payload: undefined })
          customSuccess("Odhlášení proběhlo úspěšně")
        }
      })
      .catch((e) => {
        //if (e) error.smthBroke();
        customError("Nastala neočekávaná chyba!")
        console.error(e)
      })
  }, [])

  return (
    <Container>
      {!user ? <Redirect exact to="/" /> : null}

      <div className="d-flex align-items-center justify-content-center h-100">
        <ClipLoader size={150} color={"#123abc"} loading={true} />
      </div>
    </Container>
  )
}

export default Logout
