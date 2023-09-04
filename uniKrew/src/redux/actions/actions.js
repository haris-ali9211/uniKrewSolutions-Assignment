export function loaderStart() {
  return dispatch => dispatch({type: 'LOADER_START'});
}
export function loaderStop() {
  return dispatch => dispatch({type: 'LOADER_STOP'});
}

export function saveProductToCart(product) {
  return dispatch => dispatch({type: 'ADD_TO_CART', payload: product});
}

export function saveRecurveProductToCart(product) {
  return dispatch =>
    dispatch({type: 'ADD_RECURRING_TO_CART', payload: product});
}

export function resetProductFromCart() {
  return dispatch => dispatch({type: 'RESET_CART'});
}

export function removeProductFromCart(_id) {
  return dispatch => dispatch({type: 'REMOVE_FROM_CART', payload: _id});
}
