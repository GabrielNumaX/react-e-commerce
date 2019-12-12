import React from 'react';

import css from './Loader.module.css';

const Loader = (props) => {

    return(
        props.visible ?
        
            <div className={css.LoaderDiv}>
                <h1 className={css.LoaderH1}>Loading...</h1>
            </div>
        :

        props.children
    )

}

export default Loader;