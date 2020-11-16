import Axios from "axios"
import React, { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { customError, customSuccess, getApiURI } from "../helpers"
import { LOGIN } from "../redux/common"
import { useUser } from "../redux/hooks"

function Register() {
  const { register, handleSubmit, watch, errors } = useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [state, setState] = useState<boolean>(false)

  const user = useUser()

  const onSubmit = (data: any) => {
    setLoading(true)
    delete data.password_again
    Axios(getApiURI("/auth/register"), {
      method: "post",
      withCredentials: true,
      data
    })
      .then((data) => {
        console.log(data)
        if (data.data === 1) {
          customSuccess("Registrace proběhla úspěšně. Přihlaste se!")
          setState(true)
        } else {
          if (data.data?.errors) {
            for (let o of Object.values(data.data.errors)) {
              // @ts-ignore
              customError(o)
            }
          } else {
            customError("Nastala neočekávaná chyba!")
          }
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
      {state ? <Redirect exact to="/login" /> : null}
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
            ref={register({ required: true, minLength: 8 })}
          />
          {errors.password ? (
            <Form.Text className="text-danger">
              Toto pole je vyžadováno a musí mít délku alespoň 8 znaků
            </Form.Text>
          ) : null}
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Heslo znovu</Form.Label>
          <Form.Control
            type="password"
            placeholder="Zadejte heslo znovu"
            name="password_again"
            disabled={loading}
            ref={register({
              required: true,
              validate: (value) => value === watch("password")
            })}
          />
          {errors.password_again ? (
            <Form.Text className="text-danger">
              Toto pole je vyžadováno a musí se shodovat s původním heslem
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

export default Register
