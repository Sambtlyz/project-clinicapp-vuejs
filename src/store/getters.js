export const isLogin = (state) =>{
    return state.isLogged;
}
export const username = (state) => {
    return state.username
}

export const cartTotal = (state) => {
    return state.cart.length
}

export const cartTotalOrders = (state) =>{
    let total = 0;

    state.cart.forEach(item => {
        total += item.order.order_price * item.order.order_amount
    })
    return total;
}