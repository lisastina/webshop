import style from '../css/CartItem.module.css';
import { useContext, useState } from 'react'
import { CartContext } from '../contexts/CartContext';

const CartItem = (props) => {
    const { removeFromCart } = useContext(CartContext);
    const [productQuantity, setProductQuantity] = useState(props.item.quantity)
    

    const handleQuantity = (e) => {
        setProductQuantity(Number(e.target.value))
    }

    return ( 
        <div className={style.cartItem}>
            <div className={style.imgContainer}>
                <div className={style.x} onClick={() => removeFromCart(props.item)}></div>
                <div className={style.imgWrapper}>
                    <img src={props.item.img} alt=""/>
                </div>
            </div>
            <div className={style.info}>
            <div className={style.quantity}>
                            <label htmlFor="">QTY</label>
                            <input onChange={handleQuantity} value={productQuantity} type="number" min="1" step="1"/>
                        </div>
                <div><h2>{props.item.price * props.item.quantity} kr</h2></div>
            </div>
        </div>
     );
}
 
export default CartItem;