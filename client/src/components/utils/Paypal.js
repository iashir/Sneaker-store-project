import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import notify from "./toastify";
import { sandbox } from "../Config";
export default class Paypal extends React.Component {
  render() {
    const onSuccess = (payment) => {
      this.props.onSuccess(payment);
    };

    const onCancel = (data) => {
      notify("error", "The payment was cancelled!");
    };

    const onError = (err) => {
      notify("error", "Error occured");
    };

    let env = "sandbox";
    let currency = "USD";
    let total = this.props.toPay;

    const client = {
      sandbox: sandbox,
      production: "YOUR-PRODUCTION-APP-ID",
    };
    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    );
  }
}
