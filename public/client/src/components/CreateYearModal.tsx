import React, { useEffect, useState } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"
import { getApiURI } from "../helpers"

function CreateYearModal({
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
    fetch(getApiURI("/schools/pocet"), {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((response) => {
        setSending(false)
        console.log(response)
        onHide()
      })
      .catch((error) => {
        console.log(error)
        setSending(false)
      })
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
          <Modal.Title>Přidat rok</Modal.Title>
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
                  <Form.Label>Rok</Form.Label>
                  <Form.Control
                    min={0}
                    placeholder="Rok"
                    ref={register({ required: true })}
                    name="rok"
                  />
                  {errors.exampleRequired && (
                    <span>This field is required</span>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Počet</Form.Label>
                  <Form.Control
                    min={0}
                    placeholder="Počet"
                    ref={register({ required: true })}
                    name="pocet"
                  />
                  {errors.exampleRequired && (
                    <span>This field is required</span>
                  )}
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
              {errors.exampleRequired && <span>This field is required</span>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Škola</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Škola..."
                name="skola"
                ref={register({ required: true })}>
                {Object.keys(data.skola).map((key) => (
                  <option value={key}>{data.skola[key]}</option>
                ))}
              </Form.Control>
              {errors.exampleRequired && <span>This field is required</span>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Obor</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Obor..."
                name="obor"
                ref={register({ required: true })}>
                {Object.keys(data.obor).map((key) => (
                  <option value={key}>{data.obor[key]}</option>
                ))}
              </Form.Control>
              {errors.exampleRequired && <span>This field is required</span>}
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

export default CreateYearModal
