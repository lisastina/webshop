import style from "../css/PlaceOrder.module.css";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";

const PlaceOrder = () => {
  const [payment, setPayment] = useState("Card");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("sweden");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [exDate, setExDate] = useState("");
  const [securityNumber, setSecurityNumber] = useState("");

  const paymentOptions = ["Card", "Invoice", "Paypal"];

  const { setShipping, checkout, setCheckout, cartTotal, handlePlaceOrder } =
    useContext(CartContext);

  const handleClick = (e) => {
    if (
      firstName &&
      lastName &&
      country &&
      street &&
      zip &&
      city &&
      phone &&
      email
    ) {
      if (payment === "Card" && cardNumber && exDate && securityNumber) {
        e.preventDefault();
        handlePlaceOrder();
      }
      if (payment !== "Card") {
        e.preventDefault();
        handlePlaceOrder();
      } else {
        e.preventDefault();
      }
    }
  };

  useEffect(() => {
    setShipping({
      firstName,
      lastName,
      country,
      street,
      zip,
      city,
      phone,
      email,
      payment,
    });
  }, [
    firstName,
    lastName,
    country,
    street,
    zip,
    city,
    phone,
    email,
    payment,
    setShipping,
  ]);

  return (
    <form>
      <div className={style.placeOrder}>
        <div className={style.shippingInfo}>
          <h1>Shipping </h1>
          <div className={style.shippingInputContainer}>
            <input
              required
              id="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className={`customSelect ${style.select}`}>
            <select
              name="country"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="sweden">Sweden</option>
            </select>
            <span className="focus"></span>
          </div>
          <div className={style.shippingInputContainer}>
            <input
              required
              type="text"
              placeholder="Street name"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <input
              required
              type="text"
              name="zip-code"
              id="zip-code"
              placeholder="Zip code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
          <div className={style.shippingInputContainer}>
            <input
              required
              type="text"
              name="city"
              id="city"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              required
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className={style.shippingInputContainer}>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className={style.paymentInfo}>
          <h2>Payment</h2>

          <div className={style.options}>
            {paymentOptions.map((option, i) => {
              return (
                <div className={style.radio} key={i}>
                  <input
                    type="radio"
                    id={option}
                    name="payment"
                    onClick={(e) => setPayment(option)}
                    defaultChecked={payment === option}
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              );
            })}
          </div>

          <div className={style.selectedPayment}>
            {payment === "Card" && (
              <div className={style.cardInfo}>
                <div className={style.inputs}>
                  <label htmlFor="cardnumber">Cardnumber</label>
                  <input
                    required
                    type="text"
                    id={style.cardNumber}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div className={style.inputsContainer}>
                  <div className={style.inputs}>
                    <label htmlFor="date">Expiration date</label>
                    <input
                      required
                      type="text"
                      id="date"
                      name="card"
                      value={exDate}
                      onChange={(e) => setExDate(e.target.value)}
                    />
                  </div>
                  <div className={style.inputs}>
                    <label htmlFor="securitynumber">Security number</label>
                    <input
                      required
                      type="text"
                      id="securitynumber"
                      name="card"
                      value={securityNumber}
                      onChange={(e) => setSecurityNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {payment === "Invoice" && (
              <div>
                <p>
                  An invoice with payment details will be sent to your address.
                </p>
              </div>
            )}
            {payment === "Paypal" && (
              <div>
                <p>
                  You will be directed to Paypal's page to proceed with your
                  payment after you have place your order.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <hr />
        <div className={`${style.buy} ${style.checkingOut}`}>
          <div>
            <h2>Subtotal {cartTotal} kr</h2>
            <div>
              <h2>Shipping 50 kr</h2>
              <h1>Total {cartTotal + 50}</h1>
            </div>
          </div>
          <div className={style.buttons}>
            <button
              className={style.checkingOut}
              onClick={() => setCheckout(!checkout)}
            >
              Go back
            </button>
            <button onClick={handleClick}>Place order</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
