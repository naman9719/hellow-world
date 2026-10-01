


import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';

import React, {useState, useEffect} from 'react';
import Footer from './components/Footer';
import AddItem from './components/AddItem';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Checkout from './components/Checkout';

function App() {

const productList = [
  {
  
    name: 'IPHONE 18',
    price: 99999,
    quantity: 0,
    image: "/image/iphone18.jpg ",

  },
  {
    name: 'Samsung Galaxy S23',
    price: 19990,
    quantity: 0,
    image: "/image/s23.jpg",
  },

   {
    name: 'BMW M4',
    price: 20000000,
    quantity: 0,
    image: "/image/m4.jpg",
  },
]


const [products, setProducts] = useState( () => {
  const saved = localStorage.getItem("products");
  return saved ? JSON.parse(saved) : productList;
});

const [totalAmount, setTotalAmount] = useState( () => {
  const saved = localStorage.getItem("totalAmount");
  return saved ? JSON.parse(saved) : 0;
});

useEffect(() => {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("totalAmount", totalAmount );
}, [products, totalAmount]);





const incrementQuantity = (index)  => {
  let newProductList = [...products];
  let newTotalAmount = totalAmount;
  newProductList[index].quantity++;
  newTotalAmount += newProductList[index].price;
  setTotalAmount(newTotalAmount);
  setProducts(newProductList);
 
};



const decrementQuantity = (index) => {
  let newProductList = [...products];
  let newTotalAmount = totalAmount;
  if (newProductList[index].quantity > 0) {
    newProductList[index].quantity--;
    newTotalAmount -= newProductList[index].price;
  }
  setTotalAmount(newTotalAmount);
  setProducts(newProductList);

};

const resetQuantity = () => {
  let newProductList = [...products];
  newProductList.map((products) => {
    products.quantity = 0;
  });
  setProducts(newProductList);
  setTotalAmount(0);
};

const removeProduct = (index) => {
  const newProductList = [...products];
  let newTotalAmount = totalAmount;
  newTotalAmount -= newProductList[index].quantity * newProductList[index].price;
  newProductList.splice(index, 1);
  setProducts(newProductList);
  setTotalAmount(newTotalAmount);
};


const addItem = async (name, price) => {
  let image = `https://placehold.co/400x300?text=${encodeURIComponent(name)}`;
  const nameWords = name.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

  // Wikipedia se exact naam wale page ki image

  const getWikiImage = async (title) => {
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&redirects=1&prop=pageimages&piprop=thumbnail&pithumbsize=400&format=json&origin=*`
    );
    const data = await res.json();
    const page = Object.values(data.query.pages)[0];
    return page.thumbnail ? page.thumbnail.source : null;
  };

  try {
    // 1) DummyJSON: naam ke saare words title mein poore hone chahiye

    const res = await fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(name)}&limit=10`
    );
    const data = await res.json();
    const match = data.products.find((p) => {
      const titleWords = p.title.toLowerCase().split(/[^a-z0-9]+/);
      return nameWords.length > 0 && nameWords.every((w) => titleWords.includes(w));
    });

    if (match) {
      image = match.thumbnail;
    } else {

      // 2) Wikipedia: exact naam (jaise likha), phir Title Case

      const titleCase = name
        .trim()
        .split(/\s+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
      const wikiImg =
        (await getWikiImage(name.trim())) || (await getWikiImage(titleCase));
      if (wikiImg) image = wikiImg;
    }
  } catch (error) {
    console.log('Image fetch failed', error);
  }

  setProducts((prev) => [
    ...prev,
    { name: name, price: price, quantity: 0, image: image },
  ]);
};


const [searchText, setSearchText] = useState("");
const [sortType, setSortType] = useState("default");

const filteredProducts = products.map((product, originalIndex) => ({...product, originalIndex})).filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase()))

.sort((a,b) => {
  if (sortType ==="low") return a.price - b.price;
   if (sortType ==="high") return b.price - a.price;
    if (sortType ==="name") return a.name.localeCompare(b.name);
    
    return 0;
});

const cartItems = products.filter((p) => p.quantity > 0);
const cartCount = products.reduce((sum, p) => sum + p.quantity, 0);

return (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route
        path="/"
        element={
          <>
            <main className="container mt-5">
              <div className="row mb-4">
                <div className="col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Product..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                  >
                    <option value="default">Sort By</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>

              <AddItem AddItem={addItem} />
              <ProductList
                productList={filteredProducts}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                removeProduct={removeProduct}
              />
            </main>
            <Footer totalAmount={totalAmount} resetQuantity={resetQuantity} />
          </>
        }
      />
      <Route
        path="/checkout"
        element={
          <Checkout
            cartItems={cartItems}
            totalAmount={totalAmount}
            resetQuantity={resetQuantity}
          />
        }
      />
    </Routes>
  </BrowserRouter>
);
  
  
}

export default App;
