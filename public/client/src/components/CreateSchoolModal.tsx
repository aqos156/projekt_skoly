import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"
import { customError, customSuccess, getApiURI } from "../helpers"

function CreateSchoolModal({
  show,
  onHide
}: {
  show: boolean
  onHide: () => any
}) {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isSending, setSending] = useState<boolean>(false)
  const [data, setData] = useState<any>({ mesto: [], skola: [], obor: [] })

  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = (data: any) => {
    setSending(true)
    Axios(getApiURI("/schools/skola"), {
      method: "post",
      withCredentials: true,
      data
    })
      .then((data) => {
        setSending(false)
        console.log(data)
        if (data.data === 1) {
          customSuccess("Škola byla vytvořen úspěšně.")
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
        onHide()
      })
      .catch((error) => {
        console.log(error)
        customError("Něco se pokazilo!")
      })
      .finally(() => setSending(false))
  }

  useEffect(() => {
    if (!show) {
      return
    }

    fetch(getApiURI("/schools/all"), {
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
  }, [show])

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Přidat školu</Modal.Title>
        </Modal.Header>
        {isLoading ? (
          <Modal.Body>
            <div className="d-flex align-items-center justify-content-center">
              <ClipLoader size={150} color={"#123abc"} loading={isLoading} />
            </div>
          </Modal.Body>
        ) : (
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Škola</Form.Label>
                  <Form.Control
                    placeholder="Škola"
                    ref={register({ required: true })}
                    name="nazev"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Lat</Form.Label>
                  <Form.Control
                    placeholder="Lat"
                    ref={register({ required: true })}
                    name="geo-lat"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Lng</Form.Label>
                  <Form.Control
                    placeholder="Lng"
                    ref={register({ required: true })}
                    name="geo-long"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Město</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Město..."
                name="mesto"
                ref={register({ required: true })}>
                {Object.keys(data.mesto).map((key) => (
                  <option value={key}>{data.mesto[key]}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isSending}>
            Zrušit
          </Button>
          <Button variant="primary" type="submit" disabled={isSending}>
            Přidat
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default CreateSchoolModal
