import React from 'react';
import utils from '../utils.js';

class Products extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const productItems =this.props.products.map(product => {
            return (
                <div className="col-md-4" key={product.id}>
                    <div className="thumbnail text-center">
                        <a href={`#/${product.sku}`} onClick={(e)=>this.props.handleAddToCart(e,product)}>
                            <img src={`/products/${product.image}`} alt={product.name}/>
                            <p>
                                {product.name}
                            </p>
                        </a>
                        <div>
                            <b>{utils.formatCurrency(product.price)}</b>
                            <button className="btn btn-primary" onClick={(e)=>this.props.handleAddToCart(e,product)}>
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

export default Products;