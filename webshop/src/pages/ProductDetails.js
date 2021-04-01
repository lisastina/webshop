import style from '../css/ProductDetails.module.css';
import { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';

const ProductDetails = (props) => {

    const { products } = useContext(ProductContext);
    const [product, setProduct] = useState(null);

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
                    <h1>{product.name}</h1>
                    <h2>{product.price} kr</h2>
                    <p>{product.desc}</p>
                    <div className={style.selects}>
                        {product.productType === "poster" && 
                        
                        <div className={style.sizes}>
                            <label htmlFor="">Size:</label>
                            <div className="customSelect">
                                <select name="" id="">
                                    <option value="">30x40 cm</option>
                                    <option value="">50x70 cm</option>
                                    <option value="">70x100 cm</option>
                                </select>
                                <span className="focus"></span>
                            </div> 
                        </div>}
                        <div className={style.quantity}>
                        <label htmlFor="">Quantity:</label>
                        
                            <input type="number" min="1" step="1"/>
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