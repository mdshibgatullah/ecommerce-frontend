import React from 'react';
import { FaShippingFast, FaShieldAlt, FaLock } from 'react-icons/fa';


const FeatureBadge = () => {
  return (
    <div className="container my-4">
      <div className="features-banner p-4">
        <div className="row g-4 align-items-center">
          
          {/* Free Delivery */}
          <div className="col-md-4 d-flex align-items-center feature-divider">
            <div className="feature-icon-circle me-3">
              <FaShippingFast />
            </div>
            <div>
              <h6 className="fw-bold mb-0 text-dark">Free Delivery</h6>
              <small className="text-muted">On all orders</small>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="col-md-4 d-flex align-items-center feature-divider">
            <div className="feature-icon-circle me-3">
              <FaShieldAlt />
            </div>
            <div>
              <h6 className="fw-bold mb-0 text-dark">Money Back Guarantee</h6>
              <small className="text-muted">7 days return policy</small>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="col-md-4 d-flex align-items-center">
            <div className="feature-icon-circle me-3">
              <FaLock />
            </div>
            <div>
              <h6 className="fw-bold mb-0 text-dark">Secure Payment</h6>
              <small className="text-muted">100% protected</small>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FeatureBadge;