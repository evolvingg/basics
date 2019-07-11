import React from 'react';
import utils from '../utils.js';
import { connect } from 'react-redux';
import {fetchProducts} from '../actions/productActions';
import {addToCart} from '../actions/cartActions';

class Products extends React.Component {

    componentDidMount() {
        this.props.fetchProducts();
    }
    render() {
        const productItems =this.props.products.map(product => {
            return (
                <div className="col-md-4" key={product.id}>
                    <div className="thumbnail text-center">
                        <a href={`#/${product.sku}`} onClick={(e)=>this.props.addToCart(this.props.cartItems,product)}>
                            <img src={`/products/${product.image}`} alt={product.name}/>
                            <p>
                                {product.name}
                            </p>
                        </a>
                        <div>
                            <b>{utils.formatCurrency(product.price)}</b>
                            <button className="btn btn-primary" onClick={(e)=>{ 
                                return this.props.addToCart(this.props.cartItems,product)}}>
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            );
        })
        return (
            <div className="row">
                {productItems}
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("mapstate::",state);
    return{
    products: state.products.filteredItems,
    cartItems: state.cart.items
}}; 

const mapDispatchToProps = (dispatch) => {
    console.log('mapdispatch::',dispatch);
    return ({
    addToCart: (items, product) => {
        console.log('....hi disp......',items,product);
        dispatch(addToCart(items, product));
    },
    fetchProducts : () => {
        dispatch(fetchProducts());
    }
})
};

export default connect(mapStateToProps,mapDispatchToProps)(Products);