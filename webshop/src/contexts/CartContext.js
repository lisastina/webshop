import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const history = useHistory();

  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);
  const [cartLength, setCartLength] = useLocalStorage("cartLength", []);

  const [shipping, setShipping] = useState();

  const [checkout, setCheckout] = useState(false);
  const [order, setOrder] = useState(null);

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const prices = cartItems.map((item) => {
      let totalPrice = item.price * item.quantity;
      return totalPrice;
    });
    setCartTotal(prices.reduce((sum, curr) => sum + curr, 0));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartLength", JSON.stringify(cartLength));
  }, [cartLength]);

  useEffect(() => {
    if (cartItems.length === 0) {
      setCartLength(0);
    }
  }, [cartLength, cartItems.length]);

  const addToCart = (newItem) => {
    setCartItems([...cartItems, newItem]);
    setCartLength(Number(cartLength) + Number(newItem.quantity));
  };

  const changeQuantity = (index, quantity) => {
    if (cartItems[index].quantity > quantity) {
      let difference = cartItems[index].quantity - quantity;
      setCartLength(cartLength - difference);
    }
    if (cartItems[index].quantity < quantity) {
      let difference = quantity - cartItems[index].quantity;
      setCartLength(cartLength + difference);
    }

    let copyCartItems = [...cartItems];
    copyCartItems[index].quantity = quantity;
    setCartItems(copyCartItems);
  };

  const removeFromCart = (itemToRemove) => {
    setCartItems(
      cartItems.filter(
        (item) =>
          item.size !== itemToRemove.size || item.name !== itemToRemove.name
      )
    );
    setCartLength(Number(cartLength) - Number(itemToRemove.quantity));
  };

  const handlePlaceOrder = () => {
    let orderNumber = Math.round(Math.random() * 10000000);
    setOrder({
      shipping,
      cartItems,
      ordernumber: orderNumber,
      totalPrice: cartTotal + 50,
    });
    history.push(`/confirmation/${orderNumber}`);
    setCartItems([]);
    setCartLength(0);
  };

  const values = {
    cartItems,
    setCartItems,
    cartTotal,
    addToCart,
    removeFromCart,
    cartLength,
    setCartLength,
    changeQuantity,
    checkout,
    setCheckout,
    order,
    handlePlaceOrder,
    setShipping,
  };
  return (
    <CartContext.Provider value={values}>{props.children}</CartContext.Provider>
  );
};

export default CartContextProvider;
