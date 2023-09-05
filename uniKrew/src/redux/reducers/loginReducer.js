const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
  loading: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isFetching: true,
        error: false,
        loading: true,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        currentUser: action.payload,
        isFetching: false,
        error: false,
        loading: false,
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        currentUser: null,
        isFetching: false,
        error: true,
        loading: false,
      };

    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
        isFetching: false,
        error: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default loginReducer;
