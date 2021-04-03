import style from '../css/Checkout.module.css';
import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext';
import CartItem from '../components/CartItem';

const Checkout = () => {

    const { cartItems } = useContext(CartContext);

    return ( 
        <div className={style.checkout}>
            <h1>Shopping cart</h1>
            {cartItems && cartItems.map((item, index) => 
                <CartItem item={item} key={index} index={index}/>)}
            
        </div>
     );
}
 
export default Checkout;