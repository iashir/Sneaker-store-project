import React, { useState } from "react";
import { Form, Button } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_actions";
function QuantityIncrease(props) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(props.product.quantity);
  const [id] = useState(props.product._id);

  const handleChange = (e) => {
    if (e.target.value > 10) {
      setQuantity(10);
    } else {
      setQuantity(e.target.value);
    }
  };

  const handleSubmit = () => {
    dispatch(addToCart(id, quantity));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        <input
          type="number"
          id={props.product._id}
          value={quantity}
          min="1"
          max="10"
          onChange={handleChange}
        />
        EA
        <Button
          style={{ marginLeft: "8px" }}
          size="small"
          type="primary"
          htmlType="submit"
        >
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}

export default QuantityIncrease;
