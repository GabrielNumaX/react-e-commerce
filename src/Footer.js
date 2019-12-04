import React from 'react';

import css from './Footer.module.css';


const Footer = () => {

    return (
        <footer>
            <h5 className={css.FooterH5}>&copy;NumaX</h5>
            <div className={css.FooterDiv}>
                <a href="#">Back To Top</a>
            </div>
        </footer>
    );

}

export default Footer;