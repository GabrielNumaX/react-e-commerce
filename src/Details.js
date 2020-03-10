import React, {Component}from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

// import {Link} from 'react-router-dom';

import css from './Details.module.css';

class Details extends Component {

    state = {
        uniqueProdObj: {},
        prodPhotosArr: [],
        // prodArr: []
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
                uniqueProdObj: {...response.data, count: 0 },
                prodPhotosArr: response.data.photos
            })

            // this.props.loadCurrentObj(response.data)
        })
        .catch(error => {
            alert('Error Reload Page');
            console.log(error);
        })
    }

    componentDidUpdate() {

        // console.log('didUpdate');

        //this print count: 1
        // console.log(this.state.uniqueProdObj);

        //this prints count: 0 -> it's like when obj is being pushed it's not updated yet
        // console.log(this.props.shopItemsArr);

        // this.props.loadCurrentObj(this.state.uniqueProdObj)

        localStorage.setItem('shopCart', JSON.stringify(this.props.shopCart));

        if(!Array.isArray(this.props.shopItemsArr) && !this.props.shopItemsArr.length){

            this.props.loadCurrentObj(this.state.uniqueProdObj);

        }
        else {

            let foundIndex = -1

            this.props.shopItemsArr.map((item, pos) => {

                // console.log('state', this.state.uniqueProdObj.id)
                // console.log('item', item.id)

                if(this.state.uniqueProdObj.id === item.id){
                    foundIndex = pos
                    
                    return foundIndex;
                }

                return null;
            })
            
            if(foundIndex > -1){

                this.props.onIndexFound(foundIndex, 0);
            }

            else {

                this.props.loadCurrentObj(this.state.uniqueProdObj);

            }
        }

             
    }

    localStorageCheck = () => {

      let productList = localStorage.getItem('prodList');

      productList = productList === null || productList === '' ? [] : productList;

      productList = productList.length > 0 ? JSON.parse(productList) : [];

      var foundIndex = -1;

      for(var i = 0; i < productList.length; i++){
        if(productList[i].id === this.state.uniqueProdObj.id){
          foundIndex = i;
        }
      } 

      if(foundIndex > -1){
        // productList[foundIndex].count += 1;
        productList[foundIndex] = this.state.uniqueProdObj;
        localStorage.setItem('prodList', JSON.stringify(productList));
      }
      else {
        // currentObj.count = 1;
        productList.push(this.state.uniqueProdObj);
        localStorage.setItem('prodList', JSON.stringify(productList));
      }

    }

    onItemAdd = () => {

        let foundIndex = -1;

        //check if globalStore array is empty
        // CONDITION 1
        if(!Array.isArray(this.props.shopItemsArr.length) && !this.props.shopItemsArr.length){
            //if NOT sets count in prodObj to 1
            //and should increase shopCart count and push OBJ to Array from global Store

            // console.log('empty array');

            this.setState({
                uniqueProdObj: {
                    ...this.state.uniqueProdObj,
                    count: 1}
            });

            //this here it's not working
            // this.props.onItemShop();

            // console.log('click');

            // this pushes the object but doesn't updates count: 1 - due to asynchronicity???
            // this.props.loadCurrentObj(this.state.uniqueProdObj)

            
        } 
        //else finds index in array
        else {

            this.props.shopItemsArr.map((item, pos) => {

                // console.log('state', this.state.uniqueProdObj.id)
                // console.log('item', item.id)

                if(this.state.uniqueProdObj.id === item.id){
                    foundIndex = pos

                    return foundIndex;
                }     
                
                return null;
            })

            //redux -> increase cart
            this.props.onItemShop();

            //with that index UPDATE the array position and count key

            if(foundIndex > -1) {

                this.props.onIndexFound(foundIndex, 1)
    
            }

        }

        localStorage.setItem('prodList', JSON.stringify(this.props.shopItemsArr));
        localStorage.setItem('shopCart', JSON.stringify(this.props.shopCart));
        //  localStorage.setItem('prodList', JSON.stringify(this.props.reduxStore));

        // this.localStorageCheck();

    } // end onItemAdd

    render() {

        // console.log(this.props)
        // console.log(this.props.match.params.prodId)
        // console.log(this.state.uniqueProdObj.count);
        // console.log(this.props.shopItemsArr);
        // console.log(this.state.prodPhotosArr)
        // console.log(this.props.reduxStore);

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

                            <button onClick={this.onItemAdd}>
                                Add To Cart
                            </button>
                    </div>
                    
                </aside>

            </div>
        ); //end return
    } //end render
} //end class



// this reads from STORE
const mapGlobalStateToProps = (globalState) => {
    return {
        shopItemsArr: globalState.shopItems,
        shopCart: globalState.totalCart,
    }
}

// this writes to STORE
const mapDispatchToProps = (dispatch) => {
    return {
        onItemShop: () => {
            dispatch({type: 'SHOP_CART_ADD'})        
        },
        loadCurrentObj: (shopItem) => {
            dispatch({type: 'PUSH_OBJ_TO_ARR', shopObj: shopItem})
        },
        onIndexFound: (indexFound, countUpdate) => {
            dispatch({type: 'INDEX_FOUND', index: indexFound, count: countUpdate})
        }
    }
}
export default connect(mapGlobalStateToProps, mapDispatchToProps)(Details);

// export default Details;