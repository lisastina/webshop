import { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

const ProductContextProvider = (props) => {

    const [products, setProducts] = useState()


    const changeLetters = (value) => {
        value = value.toLowerCase();
        value = value.replace(/ä/g, 'a');
        value = value.replace(/ö/g, 'o');
        value = value.replace(/å/g, 'a');
        return value;
    }
    
    const viewProduct = (clickedProduct, history) => {
            history.push(`/details/${changeLetters(clickedProduct.name.split(' ').join('-'))}`)
        }

    const createProductList = () => {
        const productList = require("../json/products.json")
        const productsWithImg = productList.map(product => { 
            const productName = changeLetters(product.name.split(' ').join('-'));
            
            return {
                ...product,
                img:`../assets/imgs/products/${(productName)}.jpg`
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
    }

    return (
        <ProductContext.Provider value={values}>
            {props.children}
        </ProductContext.Provider>
    );
}

export default ProductContextProvider;