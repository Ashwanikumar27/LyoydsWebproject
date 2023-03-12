import React, { useState, useEffect } from "react";

import { fetchProductDetail } from "./utils/api";
import "./Autocomplete.css";
import "./ProductDetail.css";

function ProductDetail({ productId }) {
  const [productInfo, setProductInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!productId) return;
    fetchProductDetail(productId)
      .then((productInfo) => {
        setProductInfo(productInfo);
      })
      .catch(() => {
        setErrorMessage("Unable to fetch product info");
      });
  }, [productId]);

  const renderProductInfo = () => {
    return (
      <div className="detail-container">
        {errorMessage ? (
          <div className="error">{errorMessage}</div>
        ) : (
          <>
            <div className="row product-image-container">
              <img src={productInfo.image} className="product-image" />
            </div>
            <div className="row">
              <div className="row-body">{productInfo.title}</div>
            </div>
            <div className="row">
              <div className="row-body product-description">
                {productInfo.description}
              </div>
            </div>
            <div className="row">
              <div className="row-body product-price">£{productInfo.price}</div>
            </div>
          </>
        )}
      </div>
    );
  };

  return productInfo && renderProductInfo();
}

export default ProductDetail;
