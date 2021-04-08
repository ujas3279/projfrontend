import React, { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/CartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API, PUB_KEY } from "../backend";
import { createOrder } from "./helper/OrderHelper";

const StripeCheckout = ({
  products,
  setReload = f => f,
  reload = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  });

  const usertoken = isAutheticated() && isAutheticated().token;
  const userId = isAutheticated() && isAutheticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = token => {
    const body = {
      token,
      products
    };
    const headers = {
      "Content-Type": "application/json"
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log(response);
        const orderData={
            products:products,
            transaction_id:10,
            amount:499
        }
        createOrder(userId, usertoken, orderData);
        cartEmpty(()=>{

        })
        setReload(!reload);
        console.log(response.name)
      })
      .catch(error => console.log(error));
  };

  const showStripeButton = () => {
    return isAutheticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51IdeSDSI5XM6hZ3DrUSYCGQZBehGPfHUCqS6Gqf0cgy8qWutlYb7U8J6AJhxFo9kDMJH5n47Sgm279VAU4LgFTfj00uH3awo8R"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Tshirts"
        shippingAddress
      >
        <button className="btn btn-success">Process To Checkout</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Total Amount {getFinalAmount()}$</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
