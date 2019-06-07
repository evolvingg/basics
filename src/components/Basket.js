import React from 'react';
import utils from '../utils';

class Basket extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {cartItems} = this.props;
        return (
            <div className="alert alert-info">
                {cartItems.length === 0 ? "Basket is empty" : <div>u hav {cartItems.length} products in d basket</div>}
                {cartItems.length>0 &&
                    <ul>
                        {cartItems.map((item,i) => {
                            console.log(item);
                            return (<li key={i}>
                                <b>{item.name}</b>
                                <div>Number:{item.count}
                                Total:
                                {item.price*item.count}</div>
                                <button className="btn btn-danger" onClick={(e)=>this.props.removeFromCart(e,item)}>
                                    X
                                </button>
                            </li>)
                        })}
                        <span>Total:
                        {utils.formatCurrency(cartItems.reduce((total,item) => { console.log(item.count);return total = total + item.count*item.price},0))}
                        </span>
                    </ul>
                }
                {
                    cartItems.length>0 &&
                    <button className="btn btn-primary" onClick={(e)=>alert('checkout to be done')}>
                    Checkout
                    </button>
                }
            </div>

        );
    }
}

export default Basket;