

import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Footer(props) {
  const navigate = useNavigate();

  return (
    <div className="fixed-bottom bg-dark text-white py-3 shadow-lg">
      <div className="container d-flex justify-content-between align-items-center">

        <button
          className="btn btn-outline-light px-4"
          onClick={() => {
            props.resetQuantity();
          }}
        >
          Reset
        </button>

        <div className="fs-4 fw-bold">
          Total: ₹{props.totalAmount.toLocaleString('en-IN')}
        </div>

        <button
          className="btn btn-success px-4"
          disabled={props.totalAmount === 0}
          onClick={() => navigate('/checkout')}
        >
          Pay Now
        </button>

      </div>
    </div>
  )
}