const initialState = {
    totalCart: 0,
    shopItems: [],
    // shopObj: {}
  }


// this below is from
// https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
// import { createReducer } from '@reduxjs/toolkit'

// const initialState = {
//   first: {
//     second: {
//       id1: { fourth: 'a' },
//       id2: { fourth: 'b' }
//     }
//   }
// }

// const reducer = createReducer(initialState, {
//   UPDATE_ITEM: (state, action) => {
//     state.first.second[action.someId].fourth = action.someValue
//   }
// })
  

// i should check for a way to push obj into shopItems[]
// maybe i could pass the obj as parameters instead
// like the customVal example from session

  const MainReducer = (previousState = initialState, action) => {
    if(action.type === 'SHOP_CART_ADD'){
      // alert('cart add');
      previousState.shopItems.push(action.shopObj)
      // console.log(previousState.shopItems.push(action.shopObj));
       return {...previousState, 
                  totalCart: previousState.totalCart + 1,
        };
    }

    // this was added to copy localStore logic from e-comm jquery project
    else if(action.type === 'PUSH_OBJ_TO_ARR'){

      previousState.shopItems.push(action.shopObj);
      return{...previousState};
    }

    else if(action.type === 'INDEX_FOUND'){

      previousState.shopItems[action.index].count += action.count

      return {...previousState}
    }
    
    // I just used the above function that increments cart and adds obj to STORE
    // else if(action.type === 'OBJ_ADD') {
    //     return {...previousState, shopObj: previousState.shopObj}
    // }
    // else if(action.type === 'ITEM_ADD'){
    //     return {...previousState, 
    //             shopItems: previousState.shopItems.push(action.itemObj)}
    // }
  
    return {...previousState}
  }
  
  export default MainReducer;