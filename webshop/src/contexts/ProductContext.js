import { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

const ProductContextProvider = (props) => {

    const [products, setProducts] = useState();
    const [quantity, setQuantity] = useState(1);

    const changeLetters = (value) => {
        value = value.toLowerCase();
        value = value.replace(/ä/g, 'a');
        value = value.replace(/ö/g, 'o');
        value = value.replace(/å/g, 'a');
        return value;
    }
    
    const viewProduct = (clickedProduct, history) => {
            history.push(`/details/${changeLetters(clickedProduct.name.split(' ').join('-'))}-${changeLetters(clickedProduct.productType.split(' ').join('-'))}`)
        }

    const createProductList = () => {
        const productList = require("../json/products.json")
        const productsWithImg = productList.map(product => { 
            const productName = changeLetters(product.name.split(' ').join('-'));
            const productType = changeLetters(product.productType.split(' ').join('-'));

            
            return {
                ...product,
                img:`../assets/imgs/products/${productName}-${productType}.jpg`
            }
        })
        setProducts(productsWithImg)
    };
        
    useEffect(() => {
        createProductList() 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    const values = {
        products,
        viewProduct,
        changeLetters,
        quantity,
        setQuantity,
    }

    return (
        <ProductContext.Provider value={values}>
            {props.children}
        </ProductContext.Provider>
    );
}

export default ProductContextProvider;