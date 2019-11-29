import React from 'react';

import {Link} from 'react-router-dom';

import css from './Clothes.module.css';

const Clothes = (props) => {

    return(
        props.data.filter(item => {

            return !item.isAccessory;
        }).map(item => {
            return(
                // <Link to={'/details/' + item.id}>
                    <div className={css.ClothCard} key={item.id}>
                        <img className={css.CardImg} src={item.preview}/>
                        <h3>{item.name}</h3>
                        <h4>{item.brand}</h4>
                        <h5>$ {item.price}</h5>
                    </div>
                // </Link>
    
            );
        })

    );

}

export default Clothes;