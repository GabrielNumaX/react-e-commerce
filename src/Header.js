import React from 'react';

import {Link} from 'react-router-dom';

import {connect} from 'react-redux';

import css from './Header.module.css';

import images from './img/images.png';
import shoppingCart from './img/shopping-cart-png.jpg';


const Header = (props) => {

    return(

        <header className={css.header}>
            <div className={css.divLinks}>
                <Link style={{textDecoration: 'none'}} to={'/'}>
                    <nav className={css.Shoplane} >SHOPLANE</nav>
                    <nav className={css.Shoplane} >CLOTHING</nav>
                    <nav className={css.Shoplane} >ACCESORIES</nav>
                </Link>
                
            </div>

            <div className={css.divShop}>
                <img className={css.shoppingCart}
                    src={shoppingCart} alt="shopping cart">
                </img>
                <div className={css.shopCounter}>{props.shopCart}</div>
                <img className={css.profilePic}
                    src={images} alt="profile pic">
                </img>
            </div>
        </header>

    );

} //end class

const mapGlobalStateToProps = (globalState) => {
    return {
        shopCart: globalState.totalCart
    }
}

export default connect (mapGlobalStateToProps)(Header);