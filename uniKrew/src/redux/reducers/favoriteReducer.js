const initialState = {
  favorites: [],
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      const newItem = action.payload;
      const isAlreadyInFavorites = state.favorites.some(
        item => item._id === newItem._id,
      );
      if (isAlreadyInFavorites) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, newItem],
      };

    case 'REMOVE_FROM_FAVORITES':
      const itemIdToRemove = action.payload;
      const updatedFavorites = state.favorites.filter(
        item => item._id !== itemIdToRemove,
      );
      return {
        ...state,
        favorites: updatedFavorites,
      };

    default:
      return state;
  }
};

export default favoriteReducer;
