

import React from 'react';
import Product from './Product';

export default function ProductList(props) {



  
  return (
    <div className="row">

  {props.productList.length > 0 ? (
props.productList.map((product, i) => {

  return <Product product={product} key={i} index={product.originalIndex} incrementQuantity={props.incrementQuantity} decrementQuantity={props.decrementQuantity} removeProduct={props.removeProduct} />
})
) : (
<h1 className="text-center">No Products Found</h1>

 )}

</div>
  );


  
}