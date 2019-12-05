const initialState = {
    totalCart: 0,
    shopItems: [],
    // shopObj: {}
  }
  

// i should check for a way to push obj into shopItems[]
// maybe i could pass the obj as parameters instead
// like the customVal example from session

  const MainReducer = (previousState = initialState, action) => {
    if(action.type === 'SHOP_CART_ADD'){
      // alert('cart add');
       return {...previousState, 
                  totalCart: previousState.totalCart + 1,
                  shopItems: previousState.shopItems.push(action.shopObj)};
    }
    
    // else if(action.type === 'OBJ_ADD') {
    //     return {...previousState, shopObj: previousState.shopObj}
    // }
    else if(action.type === 'ITEM_ADD'){
        return {...previousState, 
                shopItems: previousState.shopItems.push(action.itemObj)}
    }
  
    return {...previousState}
  }
  
  export default MainReducer;