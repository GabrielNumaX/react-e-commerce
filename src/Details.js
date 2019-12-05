import React, {Component}from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

// import {Link} from 'react-router-dom';

import css from './Details.module.css';

class Details extends Component {

    state = {
        uniqueProdObj: {},
        prodPhotosArr: [],
    }

    

    getId = () => {
        this.pId = this.props.match.params.prodId;
        // console.log(this.pId);
        return this.pId;
     }
    

    componentDidMount() {

        axios.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + this.getId())
        .then(response => {
            this.setState({
                uniqueProdObj: response.data,
                prodPhotosArr: response.data.photos
            })
        })
        .catch(error => {
            alert('Error Reload Page');
            console.log(error);
        })
    }

    render() {

        // console.log(this.props)
        // console.log(this.props.match.params.prodId)
        console.log(this.state.uniqueProdObj)
        // console.log(this.state.prodPhotosArr)

        const imgs = this.state.prodPhotosArr.map((item, pos) => {

            return(
                <img key={pos} src={item} alt="product"/>
            );
        })


        return(
            <div className={css.DetailsDiv}>
                <aside className={css.AsideImg}>
                   <img src={this.state.prodPhotosArr[0]} alt="product"/>
                </aside>

                <aside className={css.AsideDetails}>
                    <h1>{this.state.uniqueProdObj.name}</h1>
                    <h2>{this.state.uniqueProdObj.brand}</h2>
                    <h3>$ {this.state.uniqueProdObj.price}</h3>
                    <h4>{this.state.uniqueProdObj.description}</h4>
                    
                    <div className={css.PreviewContainer}>
                        <div className={css.PreviewDiv}>
                        {imgs}
                        </div>
                        <button onClick={() => this.props.onItemShop(this.state.uniqueProdObj)}>
                            Add to Cart
                        </button>
                    </div>
                    
                </aside>

            </div>
        ); //end return
    } //end render
} //end class


const mapDispatchToProps = (dispatch) => {
    return {
        onItemShop: (shopItem) => {
            dispatch({type: 'SHOP_CART_ADD', shopObj: shopItem})
        }
    }
}
export default connect(null, mapDispatchToProps)(Details);

// export default Details;