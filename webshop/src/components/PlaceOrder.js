import style from '../css/PlaceOrder.module.css';

const PlaceOrder = () => {
  return ( 
    <div className={style.placeOrder}>
      <div className={style.shippingInfo}>
        <h1>Shipping </h1>
        <form action="">
          <div className={style.name}>
            <input id="firstName" type="text" placeholder="First Name"/>
            <input id="lastName" type="text" placeholder="Last Name"/>
          </div>
          <div className={`customSelect ${style.select}`}>  
            <select name="country" id="country">
              <option value="sweden">Sweden</option>
            </select>
          </div>
          <div>
          <input type="text" placeholder="Street name"/>
            <input type="text" name="zip-code" id="zip-code" placeholder="Zip code"/>
          </div>
          <div>
            <input type="text" name="city" id="city" placeholder="City"/>
            <input type="text" name="phone" id="phone" placeholder="Phone number"/>
          </div>
          <input type="email" name="email" id="email" placeholder="Email address"/>
        </form>
      </div>
      <div className={style.paymentInfo}>
        <h2>Payment</h2>
      </div>
    </div>
   );
}
 
export default PlaceOrder;