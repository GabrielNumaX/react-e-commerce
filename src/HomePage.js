import React, {Component} from 'react';
import Axios from 'axios';

import css from './HomePage.module.css';

import Clothes from './Clothes';
import Accessories from './Accessories';
import Checkout from './Checkout';


class HomePage extends Component {

    state = {
        dataFromAPI: []
    }

    componentDidMount() {
        Axios.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product')
        .then(response => {

            this.setState({dataFromAPI: response.data})
        })
        .catch(error => {
            alert('Error Reload Page');
            console.log(error);
        })

    }


    render() {

        return(
            <div className={css.MainDiv}>

                <h2 className={css.h2}>
                    Men and Women Clothings
                </h2>

                <div className={css.ClothesDiv}>
                    <Clothes data={this.state.dataFromAPI}/>
                </div>

                <h2 className={css.h2}>
                    Accessories for Men and Women
                </h2>

                <div className={css.ClothesDiv}>
                    <Accessories data={this.state.dataFromAPI}/>
                </div>  

            </div>
        );
    }

}

export default HomePage;