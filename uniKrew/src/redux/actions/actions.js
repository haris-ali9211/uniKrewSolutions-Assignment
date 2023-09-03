export function loaderStart() {
  return dispatch => dispatch({type: 'LOADER_START'});
}
export function loaderStop() {
  return dispatch => dispatch({type: 'LOADER_STOP'});
}
