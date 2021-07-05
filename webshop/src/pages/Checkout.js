import style from '../css/Checkout.module.css';
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import NoItems from '../components/NoItems';
import PlaceOrder from '../components/PlaceOrder';
import { useHistory } from 'react-router-dom';

const Checkout = () => {
    const history = useHistory();

    const { cartItems, cartTotal, checkout, setCheckout, removeAllFromCart } = useContext(CartContext);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        setCheckout(false);
    }, [setCheckout]);

    const handleCheckout = () => {
        setCheckout(!checkout)
    }

    const handlePlaceOrder = () => {
        let orderNumber = Math.round(Math.random() * 10000000)
        setOrder({cartItems, ordernumber: orderNumber})
        history.push(`/confirmation/${orderNumber}`);
        removeAllFromCart();
    }

    return ( 
        <div>
            {cartItems.length ? 
            <div className={style.checkout}>
                {checkout ? <h1>Checkout</h1> : <h1>Shopping cart</h1>}
                {cartItems && cartItems.map((item, index) => 
                <div key={index}>
                    <hr/>
                    <CartItem item={item} index={index}/>
                </div>
                )}
                <hr/>
                {checkout && <div>
                    <PlaceOrder/>
                    <hr />
                    </div>}
                <div className={`${style.buy} ${checkout && style.checkingOut}`}>
                    <div>
                    <h2>Subtotal {cartTotal} kr</h2>
                    {checkout && 
                    <div>
                        <h2>Shipping 50 kr</h2>
                        <h1>Total {cartTotal + 50}</h1>
                    </div>
                    }
                    
                    </div>
                    {checkout ? 
                    <div>
                        <button className={style.checkingOut} onClick={handleCheckout}>Go back</button>
                        <button 
                            onClick={() => {
                                handlePlaceOrder()
                            }}
                        >Place order</button>
                    </div>
                    :
                        <button onClick={handleCheckout}>Checkout</button>
                    }
                </div>
                
            </div>
            : <NoItems />
            }
            
        </div>
     );
}
 
export default Checkout;