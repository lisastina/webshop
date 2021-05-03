import style from '../css/Checkout.module.css';
import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import NoItems from '../components/NoItems';
import PlaceOrder from '../components/PlaceOrder';

const Checkout = () => {

    const { cartItems, cartTotal, checkout, setCheckout } = useContext(CartContext);
    

    const handleCheckout = () => {
        if(checkout){
            setCheckout(false);
        }
        if(!checkout){
            setCheckout(true);
        }
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
                <div className={`${style.buy} ${checkout && style.checkingOut}`}>
                    <h2>Subtotal {cartTotal} kr</h2>
                    {checkout ? <button onClick={handleCheckout}>Go back</button>
                    :
                        <button onClick={handleCheckout}>Checkout</button>
                    }
                </div>
                {checkout && <PlaceOrder/>}
            </div>
            : <NoItems />
            }
            
        </div>
     );
}
 
export default Checkout;