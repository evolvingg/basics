import React from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Basket from './components/Basket';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';

class App extends React.Component {
   componentDidMount() {
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
              <Filter/>
              <hr/>
              <Products/>
            </div>
            <div className="col-md-4">
              <Basket/>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
