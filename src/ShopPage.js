import React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom';
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
            const shopCart = localStorage.getItem('shopCart')

            this.props.setFromLocalStorage(prodList);
            this.props.setCartFromLocalStorage(shopCart);   

            // console.log('if didMount');
        }

        // console.log('out if didMount');

        // this.setState({
        //     totalItems: this.props.shopCartCount
        // })

    
        // this.price = this.props.shopItemsArr.reduce((acc, item) => {

        //     return acc + (item.price * item.count);

        // }, 0)

        // this.setState({
        //     totalPrice: this.price
        // })

        // console.log('end didMount');

        // console.log(this.price);
        // console.log(this.state.totalPrice);
        // console.log(this.props.shopItemsArr);
    
    }

    onBuyEmptyCartData = () => {

        this.props.emptyReduxState();
        localStorage.clear();

    }

    render() {

        // console.log(this.props.shopItemsArr)

        const price = this.props.shopItemsArr.reduce((acc, item) => {

            // console.log(acc + (item.price * item.count));
            return acc + item.price * item.count;            

        }, 0)

        // console.log(price);

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
                    
                    <h5>Total Items: {this.props.shopCartCount}</h5>

                </div>

                <main className={css.Main}>

                    <aside className={css.LeftProdList}>
                        {imgDiv}
                    </aside>

                    <aside className={css.RightAmount}>

                        <h2>Total Amount</h2>

                        <h5>Total Order: $ {price}</h5> 
                        {/* calculation from this.props.shopItemsArr*/}

                        <Link to={'/checkout'}>
                            <button onClick={this.onBuyEmptyCartData}>Buy Now</button>
                        </Link>

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
        },
        setCartFromLocalStorage: (json) => {
            dispatch({type: 'SET_CART_FROM_LOCAL_STORAGE', jsonFromLocalStorage: json})
        },
        emptyReduxState: () => {
            dispatch({type: 'EMPTY_GLOBAL_STATE'})
        }
    }
}

export default connect(mapGlobalStateToProps, mapDispatchToProps)(ShopPage);

