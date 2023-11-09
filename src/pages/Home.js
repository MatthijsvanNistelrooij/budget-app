import React from "react"
import { Row, Col } from "react-bootstrap"

const myColumn = () => {
  return (
    <Col className="p-1">
      <img src="https://unsplash.it/100/80" className="image" alt="no_image.jpg" />
    </Col>
  )
}

const myRow = () => {
  return (
    <>
      <Row className="m-0">
        {myColumn()}
        {myColumn()}
        {myColumn()}
        {myColumn()}
        {myColumn()}
        {myColumn()}
        {myColumn()}
        {myColumn()}
        {myColumn()}
        {myColumn()}
      </Row>
    </>
  )
}

export default function Home() {
  return (
    <div>
      {myRow()}
      {myRow()}
      {myRow()}
      {myRow()}
      {myRow()}
      {myRow()}
      {myRow()}
      {myRow()}
    </div>
  )
}
