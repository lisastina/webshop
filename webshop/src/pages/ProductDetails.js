import style from "../css/ProductDetails.module.css";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import useGetDoc from "../hooks/useGetDoc";

const ProductDetails = (props) => {
  const { id } = useParams();
  const { addToCart, cartItems, setCartItems, cartLength, setCartLength } =
    useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("30x40");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState();
  const [buttonClick, setButtonClick] = useState(false);
  const { data } = useGetDoc("products", "product", id);

  useEffect(() => {
    setQuantity(1);

    setProduct({ ...data, quantity: 1 });
    setSize("30x40");
  }, [id, data]);

  const changePrice = () => {
    let productPrice = product.price;
    if (product.productType === "poster" || product.productType === "photo") {
      if (size === "30x40") {
        productPrice = 279;
      }
      if (size === "50x70") {
        productPrice = 349;
      }
      if (size === "70x100") {
        productPrice = 439;
      }
    }
    setPrice(productPrice);
    setQuantity(1);
  };

  useEffect(() => {
    setProduct({ ...product, quantity: quantity });
    // eslint-disable-next-line
  }, [quantity]);

  useEffect(() => {
    setProduct({ ...product, price: price, quantity: 1 });
    // eslint-disable-next-line
  }, [price]);

  useEffect(() => {
    if (product) {
      changePrice();
    }
    // eslint-disable-next-line
  }, [size]);

  const handleAddToCart = () => {
    setButtonClick(true);
    /* Move this to context file */
    if (product.productType === "poster" || product.productType === "photo") {
      product.size = size;
    }
    const match = cartItems.find(
      (item) => item.name === product.name && item.size === product.size
    );
    if (!match) {
      addToCart(product);
    }
    if (match) {
      const isItemInCart = (item) =>
        item.name === product.name && item.size === product.size;
      const indexOfCartItem = cartItems.findIndex(isItemInCart);
      const newQuantity =
        Number(cartItems[indexOfCartItem].quantity) + Number(quantity);
      let copyCartItems = [...cartItems];
      copyCartItems[indexOfCartItem].quantity = newQuantity;
      setCartItems(copyCartItems);
      setCartLength(Number(cartLength) + Number(quantity));
    }

    setTimeout(() => {
      setButtonClick(false);
    }, 1000);
  };

  return (
    <>
      {product && (
        <div className={`pages-container ${style.productDetails}`}>
          <div className={style.content}>
            <div className={style.imgWrapper}>
              {product.images && (
                <img
                  src={product.images[0].url}
                  alt={`${product.name} ${product.productType}`}
                />
              )}
            </div>
            <div className={style.desc}>
              <h1>
                {product.name} {product.productType}
              </h1>
              {product.by && <h2>{product.by}</h2>}
              <h2>{product.price} kr</h2>
              <p>{product.desc}</p>
              <div className={style.selects}>
                {!product.by &&
                  (product.productType === "poster" ||
                    product.productType === "photo") && (
                    <div className={style.sizes}>
                      <label htmlFor="size">Size:</label>
                      <div className={`customSelect ${style.select}`}>
                        <select
                          name="size"
                          id="size"
                          onChange={(e) => {
                            setSize(e.target.value);
                          }}
                          value={size}
                        >
                          <option value="30x40">30x40 cm</option>
                          <option value="50x70">50x70 cm</option>
                          <option value="70x100">70x100 cm</option>
                        </select>
                        <span className="focus"></span>
                      </div>
                    </div>
                  )}
                {!product.by && (
                  <div className={style.quantity}>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      value={quantity}
                      name="quantity"
                      type="number"
                      min="1"
                      step="1"
                    />
                  </div>
                )}
              </div>
              {product.by ? (
                <a href={product.link}>
                  <button>Buy from STOREFACTORY</button>
                </a>
              ) : (
                <button onClick={handleAddToCart} disabled={buttonClick}>
                  {buttonClick ? "Added to cart!" : "Add to cart"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
