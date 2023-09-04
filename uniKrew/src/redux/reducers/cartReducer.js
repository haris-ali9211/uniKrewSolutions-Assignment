const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newItem = action.payload;
      const updatedCartItems = [...state.cartItems, newItem];
      const updatedTotalQuantity = state.totalQuantity + newItem.quantity;
      const updatedTotalPrice =
        state.totalPrice + newItem.quantity * newItem.price; // Assuming you have a "price" property in your cart items
      return {
        ...state,
        cartItems: updatedCartItems,
        totalQuantity: updatedTotalQuantity,
        totalPrice: updatedTotalPrice,
      };
    case 'REMOVE_FROM_CART':
      const userIdToRemove = action.payload.userId;
      const updatedCartItemsFiltered = state.cartItems.filter(
        item => item.userId !== userIdToRemove,
      );
      const updatedTotalQuantityFiltered = updatedCartItemsFiltered.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      const updatedTotalPriceFiltered = updatedCartItemsFiltered.reduce(
        (total, item) => total + item.quantity * item.price,
        0,
      ); // Assuming you have a "price" property in your cart items
      return {
        ...state,
        cartItems: updatedCartItemsFiltered,
        totalQuantity: updatedTotalQuantityFiltered,
        totalPrice: updatedTotalPriceFiltered,
      };
    default:
      return state;
  }
};

export default cartReducer;
