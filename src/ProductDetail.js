import React, { useState, useEffect } from "react";

import { fetchProductDetail } from "./utils/api";
import LoadingSpinner from "./LoadingSpinner";
import "./Autocomplete.css";
import "./ProductDetail.css";

function ProductDetail({ productId }) {
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!productId) return;
    setIsLoading(true);
    fetchProductDetail(productId).then((productInfo) =>{
      setIsLoading(false);
      setProductInfo(productInfo)
    }
    ).catch(() => {
      setErrorMessage("Unable to fetch product info");
      setIsLoading(false);
   });
  }, [productId]);

  const renderProductInfo = () => {
    return (
      // {isLoading && <LoadingSpinner />}
      // {errorMessage && <div className="error">{errorMessage}</div>}
      <div className="detail-container">
        <div className="row product-image-container">
          <img src={productInfo.image} className="product-image" />
        </div>
        <div className="row">
          {/* <div className="row-title">Name:</div> */}
          <div className="row-body">{productInfo.title}</div>
        </div>
        <div className="row">
          {/* <div className="row-title">Name:</div> */}
          <div className="row-body product-description">{productInfo.description}</div>
        </div>
        <div className="row">
          {/* <div className="row-title">Price:</div> */}
          <div className="row-body">{productInfo.price}</div>
        </div>
      </div>
    );
  };

  return productInfo && renderProductInfo();
}

export default ProductDetail;
