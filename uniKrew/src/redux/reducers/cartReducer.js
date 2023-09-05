const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  const getItemPrice = (cartItems, itemId) => {
    const item = cartItems.find(item => item._id === itemId);
    if (item) {
      return item.quantity * item.price;
    }
    return 0;
  };

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
        const updatedCartItems = [...state.cartItems];
        const existingRecurringItem =
          updatedCartItems[existingRecurringItemIndex];

        const mergedSchedules = [
          ...existingRecurringItem.recurringSchedules,
          ...recurringItem.recurringSchedules,
        ];

        existingRecurringItem.recurringSchedules = mergedSchedules;

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
    case 'INCREASE_ITEM_QUANTITY':
      const increasedItemId = action.payload;
      const updatedCartItemsInc = state.cartItems.map(item => {
        if (item._id === increasedItemId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });

      const updatedTotalQuantityInc = state.totalQuantity + 1;
      const updatedTotalPriceInc =
        state.totalPrice + getItemPrice(updatedCartItemsInc, increasedItemId);

      return {
        ...state,
        cartItems: updatedCartItemsInc,
        totalQuantity: updatedTotalQuantityInc,
        totalPrice: updatedTotalPriceInc,
      };

    case 'DECREASE_ITEM_QUANTITY':
      const decreasedItemId = action.payload;
      const updatedCartItemsDec = state.cartItems.map(item => {
        if (item._id === decreasedItemId && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });

      const updatedTotalQuantityDec =
        state.totalQuantity > 1 ? state.totalQuantity - 1 : 0;
      const updatedTotalPriceDec =
        state.totalPrice - getItemPrice(updatedCartItemsDec, decreasedItemId);

      return {
        ...state,
        cartItems: updatedCartItemsDec,
        totalQuantity: updatedTotalQuantityDec,
        totalPrice: updatedTotalPriceDec,
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
