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
    

    //  // prodArr comes from STORE and prodObj from state
    // function compareIds(prodArr, prodObj) {
        
    //     let foundIndex = -1;

    //   //checks for index of list.id
    //   for(let i = 0; i < prodArr.length; i++){
    //     if(parseInt(prodArr[i].id) === parseInt(prodObj.id)){
    //       foundIndex = i;
    //     }
    //   } //end for

    //   //with the index updates count in list and updates localStorage
    //   if(foundIndex > -1){
    //     prodArr[foundIndex].count += 1;

    //     //here I have to update globalStore

    //     console.log('found');
    //   }
    //   //index NOT found. creates counter. pushes OBJ to list
    //   else {
    //     console.log('not found');
    //     prodObj.count = 1;

    //     prodArr.push(prodObj)

    //     // productList.push(currentObj);
    //   }

    //   return 
    // }

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

        //this print count: 1
        console.log(this.state.uniqueProdObj);
        // this.props.loadCurrentObj(this.state.uniqueProdObj)

        //this prints count: 0 -> it's like when obj is being pushed it's not updated yet
        console.log(this.props.shopItemsArr);
    }

    onItemAdd = () => {

        let foundIndex = -1;

        //check if globalStore array is empty
        // CONDITION 1
        if(!Array.isArray(this.props.shopItemsArr.length) && !this.props.shopItemsArr.length){
            //if NOT sets count in prodObj to 1
            //and should increase shopCart count and push OBJ to Array from global Store

            //THE PROBLEM IS HERE, count IT'S NOT UPDATED WHEN IT'S PUSHED INTO ARRAY
            //try ASYNC AWAIT???



            const updateCount  =  async () => {

                (this.setState({
                    uniqueProdObj: {...this.state.uniqueProdObj,
                        count: 1}
                })
                );

                return this.props.loadCurrentObj(this.state.uniqueProdObj);

            }

            updateCount();

            
        } 

        //else finds index in array
        else {

            this.props.shopItemsArr.map((item, pos) => {

                if(this.state.uniqueProdObj.id === item.id){
                    foundIndex = pos
                }             
            })

            //with that index UPDATE the array position and count key

            if(foundIndex > -1) {

                this.props.onIndexFound(foundIndex, 1)
    
            }

        }

        console.log(this.props.shopItemsArr);
        
    } // end onItemAdd

    render() {

        // console.log(this.props)
        // console.log(this.props.match.params.prodId)
        // console.log(this.state.uniqueProdObj.count);
        // console.log(this.props.shopItemsArr);
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

                            <button onClick={this.onItemAdd}>
                                Add To Cart
                            </button>


                        {/* FIRST TRY: this below was changed to an arrow function onItemAdd */}

                        {/* 
                        condition1 ? ( condition2 ? one-action : another-action ) 

                        : 
                        
                        ( condition3 ? one-action : another-action )  */}
                        {/* <button onClick={() => {
                            let foundIndex = -1;

                            // console.log(this.props.shopItemsArr);

                            //check if globalStore array is empty
                            // CONDITION 1
                            !Array.isArray(this.props.shopItemsArr.length) && !this.props.shopItemsArr.length ? 
                            
                                //if NOT sets count in prodObj to 1

                                //CONDITION 2
                                // (this.setState(prevState => ({
                                //     uniqueProdObj: {...prevState.uniqueProdObj,
                                //         // count: prevState.uniqueProdObj.count + 1
                                //         count: 1
                                //     }
                                // }))

                                (this.setState({
                                    uniqueProdObj: {...this.state.uniqueProdObj,
                                        count: 1}
                                })

                                // (console.log('array empty')

                                ?
                                // if set TO 1 pushes OBJ to global store array

                                // this.props.loadCurrentObj(this.state.uniqueProdObj)

                                console.log('second condition -if-  true ')
                                
                                :
                                // if NOT ??? what I do here In case or FAIL

                                console.log('second condition -else-  true ')
                                // console.log(this.state.uniqueProdObj)
                                // this.props.loadCurrentObj(this.state.uniqueProdObj)

                                )
                                
                            
                            : 
                            
                            //CONDITION 3
                            // if global store array NOT EMPTY
                            // check for equal id and GETS INDEX
                            (this.props.shopItemsArr ? 
                            
                                this.props.shopItemsArr.map((item, pos) => {

                                return this.state.uniqueProdObj.id === item.id ?
                                    
                                    foundIndex = pos

                                    :
                                    // if NOT ??? what I do here In case or FAIL

                                    console.log('index not found')
                                })
                            :
                            // if NOT index found ??? what I do here In case or FAIL
                            console.log('shopItemsArr not found')
                            )

                            //this does NOT reflects inmediately BUT on render's
                            //console.log
                            // console.log(this.state.uniqueProdObj);


                            // NEXT CONDITION
                            // if index FOUND on previous condition
                            // then UPDATE count key in global store array

                            console.log('found index',foundIndex)
                            // console.log(this.props.shopItemsArr)

                            foundIndex > -1 ?
                            
                        

                            // this.setState(prevState => ({
                            //     uniqueProdObj: {...prevState.uniqueProdObj,
                            //         count: prevState.uniqueProdObj.count + 1
                            //     }
                            // }))

                            // this.setState((prevState, prevProps) => ({
                            //     shopItemsArr: prevProps.shopItemsArr[foundIndex].count += 1
                            //     })
                            // )

                            this.props.onIndexFound(foundIndex, 1)
                            
                            :

                            // else push OBJ with count: 1 to global store array
                            // I HAVE ALREADY DONE THIS IN THE 2nd CONDITION true

                            
                            console.log('after foundIndex condition ', this.props.shopItemsArr)
                            



                        }}>
                            Add to Cart
                        </button> */}
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
    }
}

// this writes to STORE
const mapDispatchToProps = (dispatch) => {
    return {
        onItemShop: (shopItem) => {
            dispatch({type: 'SHOP_CART_ADD', shopObj: shopItem})        
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