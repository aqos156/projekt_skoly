import Axios from "axios"
import React, { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { customError, customSuccess, getApiURI } from "../helpers"
import { LOGIN } from "../redux/common"
import { useUser } from "../redux/hooks"

function Login() {
  const { register, handleSubmit, watch, errors } = useForm()
  const [loading, setLoading] = useState<boolean>(false)

  const user = useUser()

  const dispatch = useDispatch()

  const onSubmit = (data: any) => {
    setLoading(true)
    Axios(getApiURI("/auth/login"), {
      method: "post",
      withCredentials: true,
      data
    })
      .then((data) => {
        if (data.data?.user) {
          customSuccess("Přihlášení proběhlo úspěšně")
          dispatch({ type: LOGIN, payload: data.data.user })
        } else {
          customError("Uživatel s daným jménem a heslem neexistuje.")
        }
      })
      .catch((e) => {
        //if (e) error.smthBroke();
        customError("Nastala neočekávaná chyba!")
        console.error(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Container>
      {user ? <Redirect exact to="/" /> : null}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Jméno</Form.Label>
          <Form.Control
            type="text"
            placeholder="Zadejte jméno"
            name="name"
            disabled={loading}
            ref={register({ required: true })}
          />
          {errors.name ? (
            <Form.Text className="text-danger">
              Toto pole je vyžadováno
            </Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Heslo</Form.Label>
          <Form.Control
            type="password"
            placeholder="Zadejte heslo"
            name="password"
            disabled={loading}
            ref={register({ required: true })}
          />
          {errors.password ? (
            <Form.Text className="text-danger">
              Toto pole je vyžadováno
            </Form.Text>
          ) : null}
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default Login
