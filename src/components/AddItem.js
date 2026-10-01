

import React from "react";
class AddItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      productPrice: "",
    };
  }
  
    
    render() { 
        return ( 
        <form className="row mb-5" onSubmit={(e) => {
          e.preventDefault()
          this.props.AddItem(this.state.productName, Number(this.state.productPrice));
          this.setState({ productName: "", productPrice: "" });
        }} >

            <div className="mb-3 col-4">
      <label htmlFor="InputName" className="form-label">
        Name
      </label>

      <input
        type="text"
        required
        
        className="form-control"
        id="InputName"
        aria-describedby="name"
        name="productName"
        onChange={(e) => {
          this.setState({ productName: e.target.value });
        }}
        value={this.state.productName}
      />
    
    
    </div>
    <div className="mb-3 col-4">
      <label htmlFor="InputPrice" className="form-label">
      price
      </label>
      <input
        type="number"
        // ager ham khali nam or price ka product add karta hai toh vo nhi hoga isliye required lagaya hai.......
        required
        className="form-control"
        id="InputPrice"
        aria-describedby="price"
        name="productPrice"
        onChange={(e) => {
          this.setState({ productPrice: e.currentTarget.value });
        }}
        value={this.state.productPrice}
      />
    </div>
    
    
    <button type="submit" className="btn btn-primary col-4 mt-4" > 
      Add Product
    </button>
  </form>

  )
    
    }
}
 
export default AddItem;