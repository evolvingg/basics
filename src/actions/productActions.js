import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, SORT_PRODUCTS} from "./types";

export function fetchProducts() {
    return (dispatch) => {
    fetch("http://localhost:7000/posts").then(res => res.json())
    .then(data => {
        console.log('data::::',data);
        return dispatch({ type:FETCH_PRODUCTS , payload :data })
        });     
    }
}

export function filterProducts(products, size) {
    return (dispatch) => {
        console.log('filter:',products ,size);
        return dispatch({
            type: FILTER_PRODUCTS_BY_SIZE,
            payload : {
                size: size,
                items: size === '' ? products : products.filter(a =>a.availableSizes.indexOf(size.toUpperCase())>=0)
            }
        })
    } 
}

export const SortProducts = (items, sort) => (dispatch) => {
    const products = items.slice();
    if(sort !== ''){
        console.log('sort::',products);
        products.sort((a,b) => (sort === 'lowest')? (a.price>b.price?1:-1):(a.price<b.price?1:-1))
      }
      else {
        products.sort((a,b) => (a.id<b.id?1:-1))
      }
    return dispatch({
        type: SORT_PRODUCTS,
        payload : {
            sort: sort,
            items: products
        }
    })
}