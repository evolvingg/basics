import React from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Basket from './components/Basket';
import './App.css';
import Provider from 'react-redux';
import store from './store';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredProducts: [],
      products: [],
      cartItems: []
    }
  }
  handleChangeSort = (e) => {
    this.setState({sort:e.target.value});
    this.listProducts();
  }
  listProducts = () => {
    this.setState(state => {
      if(state.sort !== ''){
        state.products.sort((a,b) => (state.sort === 'lowest')? (a.price>b.price?1:-1):(a.price<b.price?1:-1))
      }
      else {
        state.products.sort((a,b) => (a.id<b.id?1:-1))
      }

      if(state.size !== undefined && state.size !== '') {
        const filtered = state.products.filter((a) =>
        (a.availableSizes.indexOf(state.size.toUpperCase())>-1) ? a: null)
        return { filteredProducts: filtered }
      }
    })
  }
  handleChangeSize = (e) => {
    this.setState({size: e.target.value})
    this.listProducts();
  }
  handleAddToCart = (e, product) => {
    console.log('target val::',e.target.value);
    this.setState( state => {
      const cartItems = state.cartItems;
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
      return cartItems;
    })
  }
  removeFromCart = (e ,item) => {
    this.setState((state) => {
      const cartItems = state.cartItems.filter(elm => elm.id !== item.id);
      localStorage.setItem('cartItems',JSON.stringify(cartItems));
      return {cartItems:cartItems};
    })
  }
   componentDidMount() {
    console.log('this::',this);
    fetch("http://localhost:8000/products").then(res => res.json())
    .then(data => this.setState({
      products: data,
      filteredProducts: data
    }));
    const items = JSON.parse(localStorage.getItem('cartItems'));
    if(items) {
      this.setState({
        cartItems: items
      })
    }
  }
  render(){
    return (
      <Provider store={store}>
        <div className="container">
          <h1>Ecommerce shopping cart</h1>
          <div className="row">
            <div className="col-md-8">
              <Filter size={this.state.size} sort={this.state.sort} handleChangeSize={this.handleChangeSize} 
              handleChangeSort={this.handleChangeSort} 
              count={this.state.filteredProducts.length} />
              <hr/>
              <Products products={this.state.filteredProducts} handleAddToCart={this.handleAddToCart}/>
            </div>
            <div className="col-md-4">
              <Basket cartItems = {this.state.cartItems} 
                handleAddToCart ={this.handleAddToCart} 
                removeFromCart ={this.removeFromCart} />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
