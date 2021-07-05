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
          <p>{order.shipping.firstName} {order.shipping.lastName}<br /> {order.shipping.street} <br />{order.shipping.zip} {order.shipping.city} <br />{order.shipping.country}</p>
          <p>{order.shipping.email} <br />{order.shipping.phone}</p>
          <p>Payment method: {order.shipping.payment}</p>
          <h3>Total price: {order.totalPrice}</h3>
        </div>
        </div>
      </div>
      }
      
    </div>
   );
}
 
export default Confirmation;