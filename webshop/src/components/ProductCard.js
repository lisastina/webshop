import style from '../css/ProductCard.module.css';

const ProductCard = (props) => {

    return ( 
        <div className={style.productCard}>
            <div className={style.desc}>
                <h2>{props.product.name}</h2>
                <p>{props.product.desc}</p>
                <button>Purchase item</button>
            </div>
            <div className={style.imgWrapper}>
                <img src={props.product.img} alt={`${props.product.name} ${props.product.productType}`}/>
            </div>
        </div>
     );
}
 
export default ProductCard;