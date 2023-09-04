export function loaderStart() {
  return dispatch => dispatch({type: 'LOADER_START'});
}
export function loaderStop() {
  return dispatch => dispatch({type: 'LOADER_STOP'});
}

export function saveProductCart(product) {
  return dispatch => dispatch({type: 'ADD_TO_CART', payload: product});
}
