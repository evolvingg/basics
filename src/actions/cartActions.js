import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/types';

export const addToCart = (items, product) => (dispatch) => {
    console.log('.......',items);
    const cartItems = items.slice();
    let productsAlreadyInCart = false;
    cartItems.forEach((cartItem) => {
        if(cartItem.id === product.id) {
            productsAlreadyInCart = true;
            cartItem.count++;
            }
        });
    if(!productsAlreadyInCart) {
        cartItems.push({...product , count:1});
    }
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
    return dispatch({
        type: ADD_TO_CART,
        payload : {
            cartItems: cartItems        
        }
    })
}

export const removeFromCart = (items, item) => (dispatch) => {
    const cartItems = items.slice().filter(elm => elm.id !== item.id);
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
    return dispatch({
        type: REMOVE_FROM_CART,
        payload : {
            cartItems: cartItems
        }
    })
}