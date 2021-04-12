/* eslint-disable */
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartContextProvider = (props) => {

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
        console.log(prices)
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
        
        const match = cartItems.find(item => 
            item.name === newItem.name && item.size === newItem.size )
        if(!match){
            setCartItems([ ...cartItems, newItem]);
            setCartLength(Number(cartLength) + Number(newItem.quantity))

            /* addToCart(newItem); */
        }
    /*     if(match) {
            const newQuantity = newItem.quantity + quantity;
            setCartItems({...cartItems, newItem.quantity: newQuantity})
        } */        
    }

  const changeQuantity = (index, quantity) => {
      let copyCartItems = [...cartItems]
      copyCartItems[index].quantity = quantity
      setCartItems(copyCartItems);
  }

    const removeFromCart = (itemToRemove) => {
        setCartItems(cartItems.filter(item => item.size !== itemToRemove.size || item.name !== itemToRemove.name));
        setCartLength(Number(cartLength) - Number(itemToRemove.quantity))
    }

    const values = {   
        cartItems,
        cartTotal,
        addToCart,
        removeFromCart,
        cartLength,
        setCartLength,
        changeQuantity
    }
    return (
        <CartContext.Provider value={values}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;