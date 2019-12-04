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
                        <Link style={{textDecoration: 'none', color: 'black' }} 
                                to={'/details/' + item.id}>
                                    
                            <img className={css.CardImg} src={item.preview} alt="clothes"/>
                            <h3 className={css.Name}>{item.name}</h3>
                            <h4 className={css.Brand}>{item.brand}</h4>
                            <h5 className={css.Price}>$ {item.price}</h5>
                        </Link>
                    </div>
                // </Link>
    
            );
        })

    );

}

export default Clothes;