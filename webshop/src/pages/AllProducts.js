import ShopProductCard from '../components/ShopProductCard';
import { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import style from '../css/AllProducts.module.css'


const AllProducts = () => {
    const { products } = useContext(ProductContext);


    return ( 
    <div className={style.allProducts}>
        <div className={style.heading}>
            <h1>All products</h1>
        </div>
        <div className={style.products}>
        {products && products.map((product, index) => 
            <ShopProductCard product={product} key={index} index={index}/>
            )}
        </div> 
    </div>
    );}
 
export default AllProducts;