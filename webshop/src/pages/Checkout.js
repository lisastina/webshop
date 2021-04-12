import style from '../css/Checkout.module.css';
import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import NoItems from '../components/NoItems';

const Checkout = () => {

    const { cartItems, cartTotal } = useContext(CartContext);

    return ( 
        <div>
            {cartItems.length ? 
            <div className={style.checkout}>
                <h1>Shopping cart</h1>
                {cartItems && cartItems.map((item, index) => 
                <div key={index}>
                    <hr/>
                    <CartItem item={item} index={index}/>
                </div>
                )}
                <hr/>
                <div className={style.buy}>
                    <h2>Subtotal {cartTotal} kr</h2>
                    <button>Checkout</button>
                </div>
            </div>
            : <NoItems />
            }
        </div>
     );
}
 
export default Checkout;