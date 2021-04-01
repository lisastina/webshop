import style from '../css/ProductDetails.module.css';
import { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';

const ProductDetails = (props) => {

    const { products } = useContext(ProductContext);
    const [product, setProduct] = useState(null);
    const [size, setSize] = useState("30x40 cm");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        findProduct()
    }, [product]);

    useEffect(() => {
        findProduct()
    }, [props.match.params.id]);

    const findProduct = () => {
        if (products) {
            setProduct(
                products.find(product => props.match.params.id === product.name)
            )
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
                    <h2>{product.price} kr</h2>
                    <p>{product.desc}</p>
                    <div className={style.selects}>
                        {product.productType === "poster" && 
                        
                        <div className={style.sizes}>
                            <label htmlFor="size">Size:</label>
                            <div className="customSelect">
                                <select name="size" id="size" onChange={e => setSize(e.target.value)} value={size}>
                                    <option value="30x40">30x40 cm</option>
                                    <option value="50x70">50x70 cm</option>
                                    <option value="70x100">70x100 cm</option>
                                </select>
                                <span className="focus"></span>
                            </div> 
                        </div>}
                        <div className={style.quantity}>
                            <label htmlFor="">Quantity:</label>
                            <input onChange={e => setQuantity(Number(e.target.value))} value={quantity} type="number" min="1" step="1"/>
                        </div>
                            
                    </div>
                <button>Add to cart</button>
                </div>
            </div>
            }
        </div>
     );
}
 
export default ProductDetails;