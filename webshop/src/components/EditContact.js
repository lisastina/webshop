import style from "../css/EditContent.module.css";
import useGetCol from "../hooks/useGetCol";
import { useRef } from "react";

const EditContact = () => {
  const { data } = useGetCol("contact-info");
  const emailRef = useRef();
  const streetRef = useRef();
  const zipCodeRef = useRef();
  const cityRef = useRef();
  const phoneRef = useRef();

  return (
    <>
      {data && (
        <div className={style.inputs}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            defaultValue={data[0].mail}
            ref={emailRef}
          />
          <label htmlFor="address">Phone number</label>
          <input
            id="phone"
            type="text"
            defaultValue={data[0].phone}
            ref={phoneRef}
          />
          <label htmlFor="instagram">Address</label>
          <div className={style.address}>
            <input
              id="address"
              type="text"
              defaultValue={data[0].street}
              ref={streetRef}
            />
            <input
              id="address"
              type="text"
              defaultValue={data[0].zipCode}
              ref={zipCodeRef}
            />
            <input
              id="address"
              type="text"
              defaultValue={data[0].city}
              ref={cityRef}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EditContact;
