import style from "../css/EditContent.module.css";
import { useRef } from "react";
import useEditDoc from "../hooks/useEditDoc";

const EditContact = ({ contact }) => {
  const editContact = useEditDoc("contact-info", contact._id);

  const emailRef = useRef();
  const streetRef = useRef();
  const zipCodeRef = useRef();
  const cityRef = useRef();
  const phoneRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    editContact.editDoc({
      city: cityRef.current.value,
      mail: emailRef.current.value,
      phone: phoneRef.current.value,
      street: streetRef.current.value,
      zipCode: zipCodeRef.current.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {contact && (
        <>
          <div className={style.inputs}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              defaultValue={contact.mail}
              ref={emailRef}
              required
            />
            <label htmlFor="address">Phone number</label>
            <input
              id="phone"
              type="text"
              defaultValue={contact.phone}
              ref={phoneRef}
              required
            />
            <label htmlFor="instagram">Address</label>
            <div className={style.address}>
              <input
                id="address"
                type="text"
                defaultValue={contact.street}
                ref={streetRef}
                required
              />
              <input
                id="address"
                type="text"
                defaultValue={contact.zipCode}
                ref={zipCodeRef}
                required
              />
              <input
                id="address"
                type="text"
                defaultValue={contact.city}
                ref={cityRef}
                required
              />
            </div>
          </div>
          <button className={`btn ${style.saveBtn}`} type="submit">
            Save
          </button>
        </>
      )}
    </form>
  );
};

export default EditContact;
