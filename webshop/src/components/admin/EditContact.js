import style from "../../css/EditContent.module.css";
import { useRef } from "react";
import useEditDoc from "../../hooks/useEditDoc";

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
          {editContact.isSuccess && (
            <div className={style.saveAlert}>
              <p>Your changes has been saved!</p>
            </div>
          )}
          <div className={style.inputs}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              defaultValue={contact.mail}
              ref={emailRef}
              required
              onClick={() => editContact.setIsSuccess(false)}
            />
            <label htmlFor="address">Phone number</label>
            <input
              id="phone"
              type="text"
              defaultValue={contact.phone}
              ref={phoneRef}
              required
              onClick={() => editContact.setIsSuccess(false)}
            />
            <label htmlFor="instagram">Address</label>
            <div className={style.address}>
              <input
                id="address"
                type="text"
                defaultValue={contact.street}
                ref={streetRef}
                required
                onClick={() => editContact.setIsSuccess(false)}
              />
              <input
                id="address"
                type="text"
                defaultValue={contact.zipCode}
                ref={zipCodeRef}
                required
                onClick={() => editContact.setIsSuccess(false)}
              />
              <input
                id="address"
                type="text"
                defaultValue={contact.city}
                ref={cityRef}
                required
                onClick={() => editContact.setIsSuccess(false)}
              />
            </div>
          </div>
          <button className={`btn ${style.saveBtn}`} type="submit">
            Save changes
          </button>
        </>
      )}
    </form>
  );
};

export default EditContact;
