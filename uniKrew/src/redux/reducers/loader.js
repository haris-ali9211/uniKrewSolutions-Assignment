const initialState = {
  isLoading: false,
};

// Reducer function to handle loader actions
const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADER_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOADER_STOP':
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default loaderReducer;
