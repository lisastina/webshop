import style from '../css/ProductCard.module.css';

const ProductCard = (props) => {

    const isOdd = (num) => { return num % 2;}

    return ( 
        <div className={`${style.productCard} ${isOdd(props.index) && style.reverse}`}>
            <div className={style.imgWrapper}>
                <img src={props.product.img} alt={`${props.product.name} ${props.product.productType}`}/>
            </div>
            <div className={style.desc}>
                <h2>{props.product.name} {props.product.productType}</h2>
                <p>{props.product.desc}</p>
                <button>Purchase item</button>
            </div>
        </div>
     );
}
 
export default ProductCard;