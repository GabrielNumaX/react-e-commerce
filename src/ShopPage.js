import React from 'react';
import {Component} from 'react';

import {connect} from 'react-redux';

import css from './ShopPage.module.css';

class ShopPage extends Component {

    state = {
        totalItems: null,
        totalPrice: null,

    }


    render() {

        // console.log(this.props.shopItemsArr)

        return(

            <div className={css.ShopDiv}>

                <div className={css.CheckoutDiv}>

                    <h2>Checkout</h2>
                    
                    <h5>Total Items: </h5>

                </div>

                <main className={css.Main}>

                    <aside className={css.LeftProdList}>

                    </aside>

                    <aside className={css.RightAmount}>

                        <h2>Total Amount</h2>

                        <h5>Total Order: $</h5>

                        <button>Buy Now</button>

                    </aside>

                </main>
                
            </div>

        ); // end return
    } //end render
} //end class

const mapGlobalStateToProps = (globalState) => {
    return {
        shopItemsArr: globalState.shopItems
    }
}

export default connect(mapGlobalStateToProps)(ShopPage);

