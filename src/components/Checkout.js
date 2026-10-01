

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const coupons = { SAVE10: 10, SAVE20: 20 };
const payLabels = { upi: 'UPI', card: 'Card', cod: 'Cash on Delivery' };

export default function Checkout(props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [payMethod, setPayMethod] = useState('upi');
  const [couponInput, setCouponInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const [placedOrder, setPlacedOrder] = useState(null);

  const discountAmount = (props.totalAmount * discountPercent) / 100;
  const finalAmount = props.totalAmount - discountAmount;

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (coupons[code]) {
      setDiscountPercent(coupons[code]);
      setCouponMsg(`Coupon applied: ${coupons[code]}% off`);
    } else {
      setDiscountPercent(0);
      setCouponMsg('Invalid coupon code');
    }
  };

  const placeOrder = (e) => {
    e.preventDefault();
    setPlacedOrder({
      id: 'ORD' + Date.now(),
      items: props.cartItems,
      total: finalAmount,
      name: name,
      payMethod: payMethod,
    });
    props.resetQuantity();
  };

  // Order ho gaya
  if (placedOrder) {
    return (
      <div className="container mt-5 text-center">
        <h1 className="text-success">Order Placed! 🎉</h1>
        <p className="fs-5">Thank you, {placedOrder.name}</p>
        <p>Order ID: <b>{placedOrder.id}</b></p>
        <p>Payment: {payLabels[placedOrder.payMethod]}</p>
        <p className="fs-4">
          Paid: <b>₹{placedOrder.total.toLocaleString('en-IN')}</b>
        </p>
        <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>
      </div>
    );
  }

  // Cart khali hai

  if (props.cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn btn-primary mt-3">Go to Products</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Checkout</h2>
      <div className="row">

        {/* Left: address aur payment */}
        <div className="col-md-7 mb-4">
          <form onSubmit={placeOrder} className="card p-4 shadow-sm">
            <h5 className="mb-3">Delivery Details</h5>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="tel"
              className="form-control mb-3"
              placeholder="Phone (10 digits)"
              required
              pattern="[0-9]{10}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <textarea
              className="form-control mb-4"
              placeholder="Full Address"
              rows="3"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <h5 className="mb-3">Payment Method</h5>
            {['upi', 'card', 'cod'].map((m) => (
              <div className="form-check mb-2" key={m}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="pay"
                  id={m}
                  checked={payMethod === m}
                  onChange={() => setPayMethod(m)}
                />
                <label className="form-check-label" htmlFor={m}>
                  {payLabels[m]}
                </label>
              </div>
            ))}

            <button type="submit" className="btn btn-success mt-3">
              Place Order · ₹{finalAmount.toLocaleString('en-IN')}
            </button>
            <Link to="/" className="btn btn-outline-secondary mt-2">
              Back to Cart
            </Link>
          </form>
        </div>

        {/* Right: order summary */}
        
        <div className="col-md-5">
          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Order Summary</h5>

            {props.cartItems.map((item) => (
              <div className="d-flex justify-content-between mb-2" key={item.name}>
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
            <hr />

            <div className="input-group mb-1">
              <input
                type="text"
                className="form-control"
                placeholder="Coupon code (SAVE10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={applyCoupon}
              >
                Apply
              </button>
            </div>
            <small className={discountPercent > 0 ? 'text-success' : 'text-danger'}>
              {couponMsg}
            </small>

            <hr />
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>₹{props.totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="d-flex justify-content-between text-success">
              <span>Discount</span>
              <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold fs-5 mt-2">
              <span>Total</span>
              <span>₹{finalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}