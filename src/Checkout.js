import React from 'react';

import {Link} from 'react-router-dom';

import css from './Checkout.module.css';

const Checkout = () => {

    return(
        <main className={css.Main}>
            <div className={css.CheckDiv}>

            </div>

            <h1 className={css.h1}>Successful Purchase </h1>
            <h3 className={css.h3}>Your order will be delivered in the next 3 days</h3>
            <Link to={'/'} style={{color: 'black'}}>
                <p className={css.p}>Back to Shop</p>
            </Link>
        </main>
    )
}

export default Checkout;

