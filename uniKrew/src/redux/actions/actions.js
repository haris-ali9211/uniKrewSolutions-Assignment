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

export function increasesQuantity(_id) {
  return dispatch => dispatch({type: 'INCREMENT_QUANTITY', payload: _id});
}

export function decreasesQuantity(_id) {
  return dispatch => dispatch({type: 'DECREMENT_QUANTITY', payload: _id});
}

export function addFavorite(product) {
  return dispatch => dispatch({type: 'ADD_TO_FAVORITES', payload: product});
}

export function removeFavorite(_id) {
  return dispatch => dispatch({type: 'REMOVE_FROM_FAVORITES', payload: _id});
}

export function loginRequest() {
  return dispatch => dispatch({type: 'LOGIN_REQUEST'});
}

export function saveUser(user) {
  return dispatch => dispatch({type: 'LOGIN_SUCCESS', payload: user});
}

export function loginRequestFailure() {
  return dispatch => dispatch({type: 'LOGIN_FAILURE'});
}

export function userLogout() {
  return dispatch => dispatch({type: 'LOGOUT'});
}
