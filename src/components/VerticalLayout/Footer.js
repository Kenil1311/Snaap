import React from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6}>{new Date().getFullYear()} © snaap.</Col>
            <Col md={6}>
              <div className="text-sm-end d-none d-sm-block">
                Design & Develop by
                <a href="https://www.softnoesis.com/" target="_blank" title="Softnoesis Pvt. Ltd." rel="noreferrer"> Softnoesis</a>

              </div>
            </Col>
          </Row>
        </Container>
      </footer >
    </React.Fragment >
  )
}

export default Footer
