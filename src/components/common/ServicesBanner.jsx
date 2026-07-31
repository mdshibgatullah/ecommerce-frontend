import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTruck, FaUndo, FaShieldAlt } from 'react-icons/fa';

const ServicesBanner = () => {
  return (
    <section className="pb-5">
      <Container>
        <div className="services-box">
          <Row className="g-4 align-items-center">
            <Col md={4} className="border-end-md">
              <div className="d-flex align-items-center gap-3">
                <div className="service-icon-circle">
                  <FaTruck />
                </div>
                <div>
                  <h6 className="fw-bold mb-0 text-dark">Free Delivery</h6>
                  <small className="text-muted">On all orders</small>
                </div>
              </div>
            </Col>

            <Col md={4} className="border-end-md">
              <div className="d-flex align-items-center gap-3">
                <div className="service-icon-circle">
                  <FaUndo />
                </div>
                <div>
                  <h6 className="fw-bold mb-0 text-dark">Money Back Guarantee</h6>
                  <small className="text-muted">7 days return policy</small>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="d-flex align-items-center gap-3">
                <div className="service-icon-circle">
                  <FaShieldAlt />
                </div>
                <div>
                  <h6 className="fw-bold mb-0 text-dark">Secure Payment</h6>
                  <small className="text-muted">100% protected</small>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default ServicesBanner;