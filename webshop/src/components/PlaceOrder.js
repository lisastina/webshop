import style from '../css/PlaceOrder.module.css';
import { useState } from 'react';

const PlaceOrder = () => {

  const [payment, setPayment] = useState("Card");

  const paymentOptions = ["Card", "Invoice", "Paypal"]

  return ( 
    <div className={style.placeOrder}>
      <div className={style.shippingInfo}>
        <h1>Shipping </h1>
        <form>
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
        <form>
          <div className={style.options}>
            {paymentOptions.map((option, i) => {
              return (
                <div className={style.radio} key={i}>
                  <input type="radio" id={option} name="payment" onClick={()=>setPayment(option)} defaultChecked={payment === option}/>
                  <label htmlFor={option}>{option}</label>
                </div>
              )
            })}
          </div>
        </form>
        <div className={style.selectedPayment}>
        {payment === "Card" &&
          <form className={style.cardInfo}>
            <div className={style.inputs}>
              <label htmlFor="cardnumber">Cardnumber</label>
              <input type="text" id={style.cardnumber}/>
            </div>
            <div className={style.inputsContainer}>
              <div className={style.inputs}>
                <label htmlFor="date">Expiration date</label>
                <input type="text" id="date" name="card"/>
              </div>
              <div className={style.inputs}>
                <label htmlFor="securitynumber">Security number</label>
                <input type="text" id="securitynumber" name="card"/>
              </div>
            </div>
          </form>}

          {payment === "Invoice" &&
          <div>
            <p>An invoice with payment details will be sent to your address.</p>
          </div>
          }
          {payment === "Paypal" && <div>
            <p>You will be directed to Paypal's page to proceed with your payment after you have place your order.</p>
          </div>
          }
        </div>
      </div>
    </div>
   );
}
 
export default PlaceOrder;