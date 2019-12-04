import React, { Component }from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Header from './Header';
import HomePage from './HomePage';
import Details from './Details';
import Footer from './Footer';

class App extends Component {

  state = {
    shopCartCount: 0,

  }

  render() {

    return (

      <BrowserRouter>

        <div className="App">
          <Header shopCart={this.state.shopCartCount}>
  
          </Header>

          <Route exact path="/" component={HomePage}/> 
          <Route path="/details/:prodId" 
                render={(props) => <Details {...props} /> } />
                                        
                                                


           <Footer></Footer>
  
        </div>    
      </BrowserRouter>
        
    ); //end return
  } //end render
  
} //end class

export default App;
