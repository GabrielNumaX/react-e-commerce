import React from 'react';
import {Component} from 'react';

import {connect} from 'react-redux';

import css from './ShopPage.module.css';

class ShopPage extends Component {

    state = {
        totalItems: 0,
        totalPrice: 0,
    }


    componentDidMount() {

        console.log('didMount');

        if(!Array.isArray(this.props.shopItemsArr.length) && !this.props.shopItemsArr.length){
                   
            const prodList = localStorage.getItem('prodList');

            this.props.setFromLocalStorage(prodList);   

            console.log('if didMount');
        }

    
        this.setState({
            totalItems: this.props.shopCartCount
        })

    
        this.price = this.props.shopItemsArr.reduce((acc, item) => {

            return acc + (item.price * item.count);

        }, 0)

        this.setState({
            totalPrice: this.price
        })
    
    }


    render() {

        console.log(this.props.shopItemsArr)

        const imgDiv = this.props.shopItemsArr.map((item, pos) => {

            return(
                <div key={item.id} className={css.ImgDiv}>
                    <img src={item.preview} alt="product"></img>
                    <div className={css.TextDiv}>
                        <h3>{item.name}</h3>
                        <h5>Quantity {item.count}</h5>
                        <h4>Price $ {item.price}</h4>
                    </div>
                </div>
            );
        })


        return(

            <div className={css.ShopDiv}>

                <div className={css.CheckoutDiv}>

                    <h2>Checkout</h2>
                    
                    <h5>Total Items: {this.state.totalItems}</h5>

                </div>

                <main className={css.Main}>

                    <aside className={css.LeftProdList}>
                        {imgDiv}
                    </aside>

                    <aside className={css.RightAmount}>

                        <h2>Total Amount</h2>

                        <h5>Total Order: $ {this.state.totalPrice}</h5>

                        <button>Buy Now</button>

                    </aside>

                </main>
                
            </div>

        ); // end return
    } //end render
} //end class

const mapGlobalStateToProps = (globalState) => {
    return {
        shopItemsArr: globalState.shopItems,
        shopCartCount: globalState.totalCart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFromLocalStorage: (json) => {
            dispatch({type: 'SET_FROM_LOCAL_STORAGE', jsonFromLocalStorage: json})
        }
    }
}

export default connect(mapGlobalStateToProps, mapDispatchToProps)(ShopPage);

