import style from '../css/Checkout.module.css';
import { useContext, useEffect } from 'react'
import { CartContext } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import NoItems from '../components/NoItems';
import PlaceOrder from '../components/PlaceOrder';

const Checkout = () => {

    const { cartItems, cartTotal, checkout, setCheckout, removeAllFromCart } = useContext(CartContext);

    useEffect(() => {
        setCheckout(false);
    }, []);

    const handleCheckout = () => {
        setCheckout(!checkout)
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
                            removeAllFromCart();
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