import React from 'react';

import {Link} from 'react-router-dom';

import css from './Header.module.css';

import images from './img/images.png';
import shoppingCart from './img/shopping-cart-png.jpg';


const Header = (props) => {

    return(

        <header className={css.header}>
            <div className={css.divLinks}>
                <Link style={{textDecoration: 'none'}} to={'/'}>
                    <a className={css.Shoplane} href="#">SHOPLANE</a>
                    <a className={css.Shoplane} href="#">CLOTHING</a>
                    <a className={css.Shoplane} href="#">ACCESORIES</a>
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

export default Header;