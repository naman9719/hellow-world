


// import React from 'react'
// class Navbar extends React.Component {

//     render() { 
//         return (

//  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//     <div className="container-fluid">
//       <a className="navbar-brand" href="#">
//         Apna Cart
//       </a>
    
//     </div>
//   </nav>


//         );
//     }
// }
 
// export default Navbar;


// new update navbar..............................


import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar sticky-top shadow">
        <div className="container">

          <Link className="navbar-brand fw-bold fs-4" to="/">
            🛒 Apna Cart
          </Link>

          <div className="d-flex align-items-center">
            <Link className="text-white text-decoration-none me-4" to="/">
              Home
            </Link>

            <Link className="cart-pill" to="/checkout">
              🛍️ Cart
              <span className="badge bg-light text-dark ms-2">
                {this.props.cartCount}
              </span>
            </Link>
          </div>

        </div>
      </nav>
    )
  }
}

export default Navbar;