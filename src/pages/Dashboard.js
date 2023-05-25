import { useState } from "react"
import { Container, Button, Col, Row, Card } from "react-bootstrap"

export default function Dashboard() {
  return (
    <div>
      <Row className="m-2">
        <Col>
          <Card>
            <img src="https://unsplash.it/300/200" alt="image.jpg" />
          </Card>
        </Col>
        <Col>
          <Card>
            <img src="https://unsplash.it/300/200" alt="image.jpg" />
          </Card>
        </Col>
        <Col>
          <Card>
            <img src="https://unsplash.it/300/200" alt="image.jpg" />
          </Card>
        </Col>
      </Row>
      <Row className="m-2">
        <Col>
          <Card>
            <img src="https://unsplash.it/300/200" alt="image.jpg" />
          </Card>
        </Col>
        <Col>
          <Card>
            <img src="https://unsplash.it/300/200" alt="image.jpg" />
          </Card>
        </Col>
        <Col>
          <Card>
            <img src="https://unsplash.it/300/200" alt="image.jpg" />
          </Card>
        </Col>
      </Row>
      <Row className="m-2">
        <Col>
          <Card>
            <img src="https://unsplash.it/300/200" alt="image.jpg" />
          </Card>
        </Col>
        <Col>
          <Card>
            <img src="https://unsplash.it/300/200" alt="image.jpg" />
          </Card>
        </Col>
        <Col>
          <Card>
            <img src="https://unsplash.it/300/200" alt="image.jpg" />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
