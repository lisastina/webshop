import style from '../css/ProductCard.module.css';

const ProductCard = (props) => {

    return ( 
        <div className={style.productCard}>
            <h1>{props.product.name}</h1>
        </div>
     );
}
 
export default ProductCard;