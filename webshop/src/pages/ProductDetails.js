import style from '../css/ProductDetails.module.css';
import { useState, useEffect, useContext } from 'react';
import ProductContext from '../contexts/ProductContext';

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
                products.find(product => props.match.params.id == product.name)
            )
        }
    }

    return ( 
        <div className={style.productDetails}>

        </div>
     );
}
 
export default ProductDetails;