import style from '../css/ProductDetails.module.css';
import { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import { CartContext } from '../contexts/CartContext';

const ProductDetails = (props) => {

    const { products, changeLetters, quantity, setQuantity } = useContext(ProductContext);
    const { addToCart, cartItems, setCartItems, cartLength, setCartLength } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [size, setSize] = useState("30x40");
    const [price, setPrice] = useState("");

    const changePrice = () => {
        let productPrice = product.price;
        if(product.productType === "poster"){
            if(size === "30x40"){
                productPrice = 279
            }if(size === "50x70"){
                productPrice = 349
            }if(size === "70x100"){
                productPrice = 439
            }
        }   
        setPrice(productPrice)
    }
    
    useEffect(() => {
        setProduct({...product, quantity: quantity});
        // eslint-disable-next-line
    }, [quantity])
    
    useEffect(() => {
        setProduct({...product, price: price});
        // eslint-disable-next-line
    }, [price])

    useEffect(() => {
        if(product){ 
            changePrice();
        }
        // eslint-disable-next-line
    },[size])

    useEffect(() => {
        findProduct();
        // eslint-disable-next-line
    }, [props.match.params.id, products]);

    const findProduct = () => {
        if (products) {
            setProduct(
                products.find(product => props.match.params.id === `${changeLetters(product.name.split(' ').join('-'))}-${changeLetters(product.productType.split(' ').join('-'))}`
                )
            )
            setQuantity(1);
            setSize("30x40");
        }
    }
    const handleAddToCart = () => {
        if(!product.by && product.productType === "poster") {
            product.size = size;
        }
        const match = cartItems.find(item => 
            item.name === product.name && item.size === product.size )
        if(!match){
            addToCart(product);
        }
        if(match){
            const isItemInCart = (item) => item.name === product.name && item.size === product.size
            const indexOfCartItem = cartItems.findIndex(isItemInCart)
            const newQuantity = Number(cartItems[indexOfCartItem].quantity) + Number(quantity)
            let copyCartItems = [...cartItems]
            copyCartItems[indexOfCartItem].quantity = newQuantity
            setCartItems(copyCartItems);
            setCartLength(Number(cartLength) + Number(quantity))
        }
    }

    return ( 
        <div className={style.productDetails}>
            {product && 
            <div className={style.content}>
                <div className={style.imgWrapper}>
                    <img src={product.img} alt={`${product.name} ${product.productType}`}/>
                </div>
                <div className={style.desc}>
                    <h1>{product.name} {product.productType}</h1>
                    {product.by && <h2>{product.by}</h2>}
                    <h2>{product.price} kr</h2>
                    <p>{product.desc}</p>
                    <div className={style.selects}>
                        {product.productType === "poster" && !product.by &&
                        
                        <div className={style.sizes}>
                            <label htmlFor="size">Size:</label>
                            <div className={`customSelect ${style.select}`}>
                                <select name="size" id="size" onChange={e => { 
                                    setSize(e.target.value)
                                }} value={size}>
                                    <option value="30x40">30x40 cm</option>
                                    <option value="50x70">50x70 cm</option>
                                    <option value="70x100">70x100 cm</option>
                                </select>
                                <span className="focus"></span>
                            </div> 
                        </div>}
                        {!product.by && 
                        <div className={style.quantity}>
                            <label htmlFor="">Quantity:</label>
                            <input onChange={e => setQuantity(Number(e.target.value))} value={product.quantity} type="number" min="1" step="1"/>
                        </div>
                        }
                    </div>
                    {product.by ? 
                    <a href={product.link}><button>Buy from STOREFACTORY</button></a>
                    : 
                    <button
                    onClick={handleAddToCart}
                    >Add to cart</button>
                }
                </div>
            </div>
            }
        </div>
     );
}
 
export default ProductDetails;