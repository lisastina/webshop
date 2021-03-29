import { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

const ProductContextProvider = (props) => {

    const [products, setProducts] = useState()

    const createProductList = () => {
        const productList = require("../json/products.json")
        const productLists = productList.map(product => { 
            return {
                ...product,
                img:`../assets/imgs/products/${product.name}-${product.productType}.jpg`
            }
        })
        setProducts(productLists)
    }
        
    useEffect(()=>{
        createProductList();  
    }, [])

    const values = {
        products
    }

    return (
        <ProductContext.Provider value={values}>
            {props.children}
        </ProductContext.Provider>
    );
}

export default ProductContextProvider;