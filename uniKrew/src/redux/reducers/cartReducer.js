const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        item => item._id === newItem._id,
      );

      if (existingItemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        const existingItem = updatedCartItems[existingItemIndex];

        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + newItem.quantity,
          cupCapacity: newItem.cupCapacity,
          sugarLevel: newItem.sugarLevel,
        };

        updatedCartItems[existingItemIndex] = updatedItem;

        const updatedTotalQuantity = state.totalQuantity + newItem.quantity;
        const updatedTotalPrice =
          state.totalPrice + newItem.quantity * newItem.price;

        return {
          ...state,
          cartItems: updatedCartItems,
          totalQuantity: updatedTotalQuantity,
          totalPrice: updatedTotalPrice,
        };
      } else {
        const updatedCartItems = [...state.cartItems, newItem];
        const updatedTotalQuantity = state.totalQuantity + newItem.quantity;
        const updatedTotalPrice =
          state.totalPrice + newItem.quantity * newItem.price;

        return {
          ...state,
          cartItems: updatedCartItems,
          totalQuantity: updatedTotalQuantity,
          totalPrice: updatedTotalPrice,
        };
      }
    case 'REMOVE_FROM_CART':
      const userIdToRemove = action.payload;
      const updatedCartItemsFiltered = state.cartItems.filter(
        item => item._id !== userIdToRemove,
      );
      const updatedTotalQuantityFiltered = updatedCartItemsFiltered.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      const updatedTotalPriceFiltered = updatedCartItemsFiltered.reduce(
        (total, item) => total + item.quantity * item.price,
        0,
      );
      return {
        ...state,
        cartItems: updatedCartItemsFiltered,
        totalQuantity: updatedTotalQuantityFiltered,
        totalPrice: updatedTotalPriceFiltered,
      };
    case 'ADD_RECURRING_TO_CART':
      const recurringItem = action.payload;
      const existingRecurringItemIndex = state.cartItems.findIndex(
        item => item.userId === recurringItem.userId && item.recurringOrder,
      );

      if (existingRecurringItemIndex !== -1) {
        // There is an existing recurring order for the user
        const updatedCartItems = [...state.cartItems];
        const existingRecurringItem =
          updatedCartItems[existingRecurringItemIndex];

        // Merge the new recurring order schedules with the existing one
        const mergedSchedules = [
          ...existingRecurringItem.recurringSchedules,
          ...recurringItem.recurringSchedules,
        ];

        // Update the existing recurring order with the merged schedules
        existingRecurringItem.recurringSchedules = mergedSchedules;

        // Recalculate the total quantity and price
        const updatedTotalQuantity =
          state.totalQuantity + recurringItem.quantity;
        const updatedTotalPrice =
          state.totalPrice + recurringItem.quantity * recurringItem.price;

        return {
          ...state,
          cartItems: updatedCartItems,
          totalQuantity: updatedTotalQuantity,
          totalPrice: updatedTotalPrice,
        };
      } else {
        // There is no existing recurring order for the user
        const updatedCartItems = [...state.cartItems, recurringItem];
        const updatedTotalQuantity =
          state.totalQuantity + recurringItem.quantity;
        const updatedTotalPrice =
          state.totalPrice + recurringItem.quantity * recurringItem.price;

        return {
          ...state,
          cartItems: updatedCartItems,
          totalQuantity: updatedTotalQuantity,
          totalPrice: updatedTotalPrice,
        };
      }

    case 'RESET_CART':
      return {
        ...state,
        cartItems: [],
        totalQuantity: 0,
        totalPrice: 0,
      };

    default:
      return state;
  }
};

export default cartReducer;
