import React, { Component }from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import {connect} from 'react-redux';
import './App.css';

import Header from './Header';
import HomePage from './HomePage';
import Details from './Details';
import ShopPage from './ShopPage';
import Checkout from './Checkout';
import Footer from './Footer';

class App extends Component {

  // this was changed to redux globalState
  // state = {
  //   shopItem: null
  // }

  render() {

    return (

      <BrowserRouter basename={process.env.PUBLIC_URL}>

        <div className="App">
          <Header>
  
          </Header>

          <Switch>

            <Route exact path="/" component={HomePage}/> 
            <Route path="/details/:prodId" 
                  render={(props) => <Details {...props} 
                  // shopItem
                  // onBtnClick={() => this.props.onItemShop(obj)}
                  /> } />
            <Route path="/confirmation" component={ShopPage} />
            <Route path="/checkout" component={Checkout} />                                     
          </Switch>

           <Footer></Footer>
  
        </div>    
      </BrowserRouter>
        
    ); //end return
  } //end render
  
} //end class

export default App;


// instead of doing this and passing function as props I did this
// in Component and passes function to button's onClick

// const mapDispatchToProps = (dispatch) => {
//   return {
//       onItemShop: (shopObj) => {
//           dispatch({type: 'SHOP_CART_ADD', shopObj: shopObj})
//       }
//   }
// }
// export default connect(null, mapDispatchToProps)(App);
