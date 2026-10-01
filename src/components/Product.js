
// import React from 'react';

// export default function Product(props) {




//   return (
//     <div className ="col-md-4 mb-4">
// <div className="product-card">
//   <div className="product-image">
//     {/* Product image */}
//   </div>
// <h2>{props.product.name} <span className="badge text-bg-secondary">₹{props.product.price}</span></h2>

// </div>

// <div className="col-3">

// <div className="btn-group" role="group" aria-label="Basic mixed styles example">
//   <button type="button" className="btn btn-danger" onClick={() => { props.decrementQuantity(props.index); }}>-</button>
//   <button type="button" className="btn btn-warning">{props.product.quantity}</button>
//   <button type="button" className="btn btn-success" onClick={() => { props.incrementQuantity(props.index); }}>+</button>
// </div>

// </div>

// <div className="col-2">

//     {props.product.quantity*props.product.price}
// </div>

// <div >

//   <button className=" btn btn-danger " onClick={() => { props.removeProduct(props.index); }}>
//     Remove
//   </button>
  
// </div>


//     </div>
//   );
// }




import React from 'react';

export default function Product(props) {
  return (
    <div className="col-md-4 mb-4">
 
      {/*  CHANGE 1: h-100 bg-white shadow-sm add kiya  */}


      <div className="product-card h-100 bg-white shadow-sm">
        <div className="product-image">
          {/* CHANGE 2: image add ki */}
          <img
            src={props.product.image || 'https://placehold.co/400x300?text=No+Image'}
            alt={props.product.name}
            className="product-img w-100"
            onError={(e) => {
              e.target.onerror = null; // Prevents infinite loop if default image fails
              e.target.src = 'https://placehold.co/400x300?text=No+Image'; // Fallback image
            }}

          />
        </div>

          {/* CHANGE 3: baaki sab ko ek padding wale div mein rakha    */}

        <div className="p-3">
          { /* CHANGE 4: h2 ko h5 jaisa dikhane ke liye className="h5" */ }

          <h2 className="h5">
            {props.product.name}{' '}
            <span className="badge text-bg-secondary">₹{props.product.price}</span>
          </h2>

          {/*  CHANGE 5: col-3 ki jagah mb-3  */}


          <div className="mb-3">
            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
              <button type="button" className="btn btn-danger" onClick={() => { props.decrementQuantity(props.index); }}>-</button>
              <button type="button" className="btn btn-warning">{props.product.quantity}</button>
              <button type="button" className="btn btn-success" onClick={() => { props.incrementQuantity(props.index); }}>+</button>
            </div>
          </div>


          <div className="fw-bold mb-3">
            Subtotal: ₹{props.product.quantity * props.product.price}
          </div>

          {/*  CHANGE 7: col-2 hata kar w-100 aur outline  */}

          <div>
            <button className="btn btn-outline-danger w-100" onClick={() => { props.removeProduct(props.index); }}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}