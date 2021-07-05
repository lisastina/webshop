/* eslint-disable */
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartContextProvider = (props) => {

    const [checkout, setCheckout] = useState(false);

    const [cartLength, setCartLength] = useState(() => {
        const localData = localStorage.getItem('cartLength');
        return localData ? JSON.parse(localData) : 0
    });

    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : []
    });

    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const prices = cartItems.map(item => {
            let totalPrice = item.price * item.quantity
            return totalPrice
        })
        setCartTotal(prices.reduce((sum, curr) => sum + curr, 0));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('cartLength', JSON.stringify(cartLength))
    }, [cartLength]);

 /*    const handleCartLength = (item) => {
        if(cartItems.length === 0) {
            setCartLength(0)
        }
        if(cartItems.length ++){
            console.log(cartLength)
            setCartLength(Number(cartLength) + Number(item.quantity))
        }
    } */
    useEffect(() => {
        if(cartItems.length === 0){
            setCartLength(0)
        }
    }, [cartLength]);

    const addToCart = (newItem) => {        
     /*    const match = cartItems.find((item) => {
            item.name === newItem.name && item.size === newItem.size
            console.log(item)
        })
        if(!match){
            setCartItems([ ...cartItems, newItem]);
            setCartLength(Number(cartLength) + Number(newItem.quantity))
        }    
        if(match){
            setCartLength(cartLength + newItem.quantity)
            let copyCartItems = [...cartItems]
            copyCartItems[index].quantity = quantity
            setCartItems(copyCartItems);
        }    */
        setCartItems([ ...cartItems, newItem]);
        setCartLength(Number(cartLength) + Number(newItem.quantity))
    }

  const changeQuantity = (index, quantity) => {
      if(cartItems[index].quantity > quantity){
        let difference = cartItems[index].quantity - quantity;
        setCartLength(cartLength - difference)
      }
      if(cartItems[index].quantity < quantity){

        let difference = quantity - cartItems[index].quantity;
        setCartLength(cartLength + difference)
      }

      let copyCartItems = [...cartItems]
      copyCartItems[index].quantity = quantity
      setCartItems(copyCartItems);
  }

    const removeFromCart = (itemToRemove) => {
        setCartItems(cartItems.filter(item => item.size !== itemToRemove.size || item.name !== itemToRemove.name));
        setCartLength(Number(cartLength) - Number(itemToRemove.quantity))
    }

    const removeAllFromCart = () => {
        setCartItems([]);
        setCartLength(0);
    }

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
        removeAllFromCart
    }
    return (
        <CartContext.Provider value={values}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;