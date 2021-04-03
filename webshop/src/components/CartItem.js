import style from '../css/CartItem.module.css';


const CartItem = (props) => {
    return ( 
        <div className={style.cartItem}>
            <div className={style.imgContainer}>
                <div className={style.x}></div>
                <div className={style.imgWrapper}>
                    <img src={props.item.img} alt=""/>
                </div>
            </div>
            <div>
                <div>quantity</div>
                <div><p>{props.item.price}</p></div>
            </div>
        </div>
     );
}
 
export default CartItem;