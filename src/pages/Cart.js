import React from "react";
import withCartContext from "../context/withCartContext";
import CartItem from "../components/CartItem";

const Cart = (props) => {
  const { cart } = props.context;
  console.log("props.context from Cart detail:>> ", props.context);
  const cartKeys = Object.keys(cart || {});
  console.log("cartKeys :>> ", cartKeys, cart);
  return (
    <>
      <div className="">
        <div className="">
          <h4 className="title">My Cart</h4>
        </div>
      </div>
      <br />
      <div className="container">
        {cartKeys.length ? (
          <div className="">
            {cartKeys.map((key) => (
              <CartItem
                cartKey={key}
                key={key}
                cartItem={cart[key]}
                removeFromCart={props.context.removeFromCart}
              />
            ))}
            <div className="">
              <br />
              <div className="">
                <button onClick={props.context.clearCart} className="">
                  Clear cart
                </button>{" "}
                <button className="" onClick={props.context.checkout}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="column">
            <div className="">No item in cart!</div>
          </div>
        )}
      </div>
      <br />
      <br />
      <br /> <br />
      <br />
      <br />
    </>
  );
};

export default withCartContext(Cart);
