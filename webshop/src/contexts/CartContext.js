import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : []
    });
    
    const [cartTotal, setCartTotal] = useState(0);
    useEffect(() => {
        setCartTotal(cartItems.reduce((sum, curr) => sum + curr.price, 0));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems]);

    const addToCart = (newItem) => {        
        setCartItems([ ...cartItems, newItem]);

    }

    const removeFromCart = (itemToRemove) => {
        setCartItems(cartItems.filter(item => item.size !== itemToRemove.size || item.name !== itemToRemove.name));
    }

    const values = {   
        cartItems,
        cartTotal,
        addToCart,
        removeFromCart,
    }
    return (
        <CartContext.Provider value={values}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;