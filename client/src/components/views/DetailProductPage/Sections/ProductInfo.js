import React, { useEffect, useState } from "react";
import { Button, Descriptions } from "antd";

function ProductInfo(props) {
  const [Product, setProduct] = useState({});

  useEffect(() => {
    setProduct(props.detail);
  }, [props.detail]);

  const addToCarthandler = () => {
    props.addToCart(props.detail._id);
  };

  return (
    <div>
      <Descriptions style={{ textAlign: "center" }} title="Product Info">
        <Descriptions.Item label="Price">
          {`$${Product.price}`}
        </Descriptions.Item>
        <Descriptions.Item label="Brand"> {Product.brand}</Descriptions.Item>
        <Descriptions.Item label="Type"> {Product.type}</Descriptions.Item>
        <Descriptions.Item label="Gender"> {Product.gender}</Descriptions.Item>
        <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
        <Descriptions.Item label="Views"> {Product.views}</Descriptions.Item>
        <Descriptions.Item label="Size">
          {Product.size ? Product.size.map((data) => `${data} | `) : null}
        </Descriptions.Item>
      </Descriptions>
      <div>
        <br />
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          About this product
        </p>
        <p> {Product.description}</p>
      </div>

      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          size="large"
          shape="round"
          type="danger"
          onClick={addToCarthandler}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
