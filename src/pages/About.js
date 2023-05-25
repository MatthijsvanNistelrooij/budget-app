import { Button, Card, Container } from "react-bootstrap"
import { useState } from "react"

import React from "react"

export default function About() {
  const [number, setNumber] = useState(0)
  const [rnd, setRnd] = useState(0)

  const handleClick = () => {
    setNumber(number + 1)
  }

  const handleSubtract = () => {
    setNumber(number - 1)
  }

  return (
    <>
      <Container>
        <h1>About</h1>
        <br />
        <br />

        <h1>{number}</h1>
        <br />

        <br />
        <Button variant="outline-success m-2" onClick={handleClick}>
          ADD NUMBER
        </Button>
        <Button variant="outline-danger" onClick={handleSubtract}>
          SUBTRACT NUMBER
        </Button>
      </Container>
      <Container>
        <Button
          variant="outline-light"
          onClick={() => setRnd(Math.floor(Math.random() * 10000))}
        >
          gen randomn num
        </Button>
        <br />
        <br />
        <h1>{rnd}</h1>
      </Container>
    </>
  )
}
