import style from '../css/ProductList.module.css';
import ProductCard from './ProductCard';
import { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';

const ProductList = () => {

    const { products } = useContext(ProductContext);

    return ( 
        <div className={style.ProductList}>
            {products && products.map((product) => 
                <ProductCard product={product} key={product.name}/>
                
            )}
        </div>
     );
}
 
export default ProductList;