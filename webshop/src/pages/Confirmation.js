import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../contexts/CartContext';
import style from '../css/Confirmation.module.css';

const Confirmation = () => {
  const { order } = useContext(CartContext);

  return ( 
    <div className={style.confirmation}>
      {order &&
      <div className={style.order}>
        <h1>Thank you for your order!</h1>
        <hr />
        <div className={style.orderInfo}>

        <div className={style.items}>
        {order.cartItems && order.cartItems.map((item, i) => 
            <p key={i}>{item.quantity} x {item.name} {item.productType} {item.size && item.size}</p>       
        )}
        </div>
        <div className={style.shippingInfo}>
          <p>Lisa Hansson <br /> Lindblomsvägen 8 <br />47542 Hönö</p>
          <p>lisastina.hansson@gmail.com <br />0733450892</p>
          <p>Payment method: Card</p>
          <h3>Total price: 234 kr</h3>
        </div>
        </div>
      </div>
      }
      
    </div>
   );
}
 
export default Confirmation;