import React, { useState } from "react";

import "./App.css";

import Autocomplete from "./Autocomplete";
import ProductDetail from "./ProductDetail";

function App() {
  const [productId, setProductId] = useState(null);
  return (
    <div className="App">
      <Autocomplete selectProduct={(productId) => setProductId(productId)} />
      <ProductDetail productId={productId} />
    </div>
  );
}

export default App;
