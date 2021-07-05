import style from '../css/PlaceOrder.module.css';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext';

const PlaceOrder = () => {

  const [payment, setPayment] = useState("Card");

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [country, setCountry] = useState();
  const [street, setStreet] = useState();
  const [zip, setZip] = useState();
  const [city, setCity] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();  

  const paymentOptions = ["Card", "Invoice", "Paypal"]

  const { setShipping } = useContext(CartContext);

useEffect(() => {
  setShipping({firstName, lastName, country, street, zip, city, phone, email, payment})
}, [firstName, lastName, country, street, zip, city, phone, email, payment]);

  return ( 
    <div className={style.placeOrder}>
      <div className={style.shippingInfo}>
        <h1>Shipping </h1>
        <form>
          <div className={style.name}>
            <input id="firstName" type="text" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            <input id="lastName" type="text" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
          </div>
          <div className={`customSelect ${style.select}`}>  
            <select name="country" id="country" value={country} onChange={(e)=>setCountry(e.target.value)}>
              <option value="sweden">Sweden</option>
            </select>
          </div>
          <div>
            <input type="text" placeholder="Street name" value={street} onChange={(e)=>setStreet(e.target.value)}/>
            <input type="text" name="zip-code" id="zip-code" placeholder="Zip code" value={zip} onChange={(e)=>setZip(e.target.value)}/>
          </div>
          <div>
            <input type="text" name="city" id="city" placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)}/>
            <input type="text" name="phone" id="phone" placeholder="Phone number" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
          </div>
          <input type="email" name="email" id="email" placeholder="Email address" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </form>
      </div>
      <div className={style.paymentInfo}>
        <h2>Payment</h2>
        <form>
          <div className={style.options}>
            {paymentOptions.map((option, i) => {
              return (
                <div className={style.radio} key={i}>
                  <input type="radio" id={option} name="payment" onClick={(e)=>setPayment(option)} defaultChecked={payment === option}/>
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