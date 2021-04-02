import style from '../css/ShopProductCard.module.css';
import { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import { useHistory } from 'react-router-dom';

const ShopProductCard = (props) => {

    const history = useHistory();
    const { viewProduct } = useContext(ProductContext);


    return ( 
        <div className={style.shopProductCard}onClick={() => viewProduct(props.product, history)}>
            <div className={style.imgWrapper}>
                <img src={props.product.img} alt={`${props.product.name} ${props.product.productType}`}/>
            </div>
            <div className={style.desc}>
                 <h2>{props.product.name} {props.product.productType}</h2>
                 <h2 className={style.price}>{props.product.price} kr</h2>
            </div>
        </div>
     );
}
 
export default ShopProductCard;