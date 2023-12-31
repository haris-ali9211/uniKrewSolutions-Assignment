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
        item => item._id === recurringItem._id && item.recurringOrder,
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

        // Create a new copy of the existing recurring item with merged schedules
        const updatedExistingRecurringItem = {
          ...existingRecurringItem,
          recurringSchedules: mergedSchedules,
        };

        // Update the existing recurring order in the cart items
        updatedCartItems[existingRecurringItemIndex] =
          updatedExistingRecurringItem;

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
    case 'INCREMENT_QUANTITY':
      const itemIdToIncrement = action.payload;
      const incrementedCartItems = state.cartItems.map(item => {
        if (item._id === itemIdToIncrement) {
          // Increment the quantity for the specified item
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });

      const updatedQuantityAfterIncrement = state.totalQuantity + 1;
      const updatedPriceAfterIncrement =
        state.totalPrice + getItemPriceById(state.cartItems, itemIdToIncrement);

      return {
        ...state,
        cartItems: incrementedCartItems,
        totalQuantity: updatedQuantityAfterIncrement,
        totalPrice: updatedPriceAfterIncrement,
      };

    case 'DECREMENT_QUANTITY':
      const itemIdToDecrement = action.payload;
      const decrementedCartItems = state.cartItems.map(item => {
        if (item._id === itemIdToDecrement && item.quantity > 1) {
          // Decrement the quantity for the specified item, but ensure it doesn't go below 1
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });

      const updatedQuantityAfterDecrement = state.totalQuantity - 1;
      const updatedPriceAfterDecrement =
        state.totalPrice - getItemPriceById(state.cartItems, itemIdToDecrement);

      return {
        ...state,
        cartItems: decrementedCartItems,
        totalQuantity: updatedQuantityAfterDecrement,
        totalPrice: updatedPriceAfterDecrement,
      };

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

function getItemPriceById(cartItems, itemId) {
  const item = cartItems.find(item => item._id === itemId);
  if (item) {
    return item.price;
  }
  return 0;
}
