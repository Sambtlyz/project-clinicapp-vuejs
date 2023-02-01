export const SET_LOGGED_IN = ( state ) => {
    return   state.isLogged = true //อ้างถึงตัวแปร state ให้เป็น true
}
export const SET_LOGGED_OUT = (state) => {
      state.isLogged = false;
}
export const SET_USERNAME = (state , username) =>{
  return  state.username = username
}
export const set_status_edit_user = (state) =>{
    state.data_edit_user = payload;
}
// export const SET_OPDCODE = (state , qpolicing) =>{
//     state.qpolicing = qpolicing
// }

export const SET_QPOLICINGDATA = (state , qpolicing) =>{
    state.qpolicing = qpolicing
}

export const ADD_TO_CART = (state, {order,quantity} )=>{
    state.cart.push({
        order,
        quantity
    })
}

export const ADD_TO_PAYMENT = (state, {orderpay} )=>{
    state.cart.push({
        orderpay
    })
}

export const REMOVE_ORDER_CART = (state, order) =>{
    state.cart = state.cart.filter(item =>{
        return item.order.order_id_pri !== order.order_id_pri;
    })
}