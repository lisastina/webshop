import style from '../css/CartItem.module.css';
import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext';

const CartItem = (props) => {
    const { removeFromCart } = useContext(CartContext);

    return ( 
        <div className={style.cartItem}>
            <div className={style.imgContainer}>
                <div className={style.x}></div>
                <div className={style.imgWrapper}>
                    <img src={props.item.img} alt=""/>
                </div>
            </div>
            <div className={style.info}>
            <div className={style.quantity}>
                            <label htmlFor="">QTY</label>
                            <input /* onChange={e => setQuantity(Number(e.target.value))} value={quantity}  */type="number" min="1" step="1"/>
                        </div>
                <div><h2>{props.item.price} kr</h2></div>
            </div>
        </div>
     );
}
 
export default CartItem;