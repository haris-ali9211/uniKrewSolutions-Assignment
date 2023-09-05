//react import
import {useState, createContext, useEffect} from 'react';

//createContext
export const OpulentSips = createContext();

// requestApi
import getApi from '../requestType/getApi';
import postApi from '../requestType/postApi';

// redux actions
import {useDispatch, useSelector} from 'react-redux';

// redux actions
import {
  saveProductToCart,
  resetProductFromCart,
  removeProductFromCart,
  saveRecurveProductToCart,
  increasesQuantity,
  decreasesQuantity,
  removeFavorite,
  addFavorite,
  loginRequest,
  saveUser,
  loginRequestFailure,
  userLogout,
} from '../redux/actions/actions';

export const OpulentSipsProvider = ({children}) => {
  // redux function
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.user);
  const {totalPrice, cartItems} = useSelector(state => state.cart);

  // useState hooks
  const [currentAccount, setCurrentAccount] = useState('algo');

  //functions

  const addOrder = async order => {
    const data = await postApi(`order/addOrder`, order, dispatch);
    if (data.savedOrder) {
      return data;
    } else {
      return data;
    }
  };

  // let orderData = {
  //   userId: '64ee02da8493957ac1a7e3a3',
  //   beverageName: 'Jasmine Green Tea',
  //   sugarLevel: 'none',
  //   cupCapacity: 'small',
  //   price: 200,
  //   quantity: 1,
  //   deliveryTime: '2023-09-01T15:30:00Z',
  //   recurringOrder: true,
  //   recurringSchedules: [
  //     {
  //       dayOfWeek: 'Monday',
  //       deliveryTime: '15:30',
  //     },
  //     {
  //       dayOfWeek: 'Wednesday',
  //       deliveryTime: '15:30',
  //     },
  //     {
  //       dayOfWeek: 'Friday',
  //       deliveryTime: '15:30',
  //     },
  //   ],
  // };

  // useEffect(() => {
  //   addOrder(orderData);
  // }, []);

  const loginUser = async credentials => {
    dispatch(loginRequest());
    const data = await postApi(`user/login`, credentials, dispatch);
    if (data.user) {
      dispatch(saveUser(data.user));
      return data?.user;
    } else {
      dispatch(loginRequestFailure());
      return data;
    }
  };

  const registerUser = async credentials => {
    const data = await postApi(`user/register`, credentials, dispatch);
    if (data) {
      return data;
    } else {
      return data;
    }
  };

  const logOutUser = async () => {
    try {
      dispatch(userLogout());
    } catch (error) {
      console.log('error', error);
    }
  };

  const getProductsFromStore = async () => {
    const data = await getApi(`product/getAllProduct`, dispatch);
    if (data?.status) {
      return data?.response;
    } else {
      return null;
    }
  };

  const getOneProductFromStore = async _id => {
    const data = await getApi(`/product/${_id}`, dispatch);
    if (data?.status) {
      return data?.response;
    } else {
      return null;
    }
  };

  const setProductToCart = cartData => {
    try {
      dispatch(saveProductToCart(cartData));
    } catch (error) {
      console.log('error', error);
    }
  };

  const setRecurveProductToCart = cartData => {
    try {
      dispatch(saveRecurveProductToCart(cartData));
    } catch (error) {
      console.log('error', error);
    }
  };

  const setFavorite = product => {
    try {
      dispatch(addFavorite(product));
    } catch (error) {
      console.log('error', error);
    }
  };

  const unSetFavorite = _id => {
    try {
      dispatch(removeFavorite(_id));
    } catch (error) {
      console.log('error', error);
    }
  };

  const resetProductCart = () => {
    try {
      dispatch(resetProductFromCart());
    } catch (error) {
      console.log('error', error);
      Toast.show({
        text1: 'Something went wrong',
        text2: 'Please try again',
        textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 5000,
      });
    }
  };

  const increasesQuantityProduct = _id => {
    try {
      dispatch(increasesQuantity(_id));
    } catch (error) {
      console.log('error', error);
      Toast.show({
        text1: 'Something went wrong',
        text2: 'Please try again',
        textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 5000,
      });
    }
  };

  const decreasesQuantityProduct = _id => {
    try {
      dispatch(decreasesQuantity(_id));
    } catch (error) {
      console.log('error', error);
      Toast.show({
        text1: 'Something went wrong',
        text2: 'Please try again',
        textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 5000,
      });
    }
  };

  const removeProduct = _id => {
    try {
      dispatch(removeProductFromCart(_id));
    } catch (error) {
      console.log('error', error);
      Toast.show({
        text1: 'Something went wrong',
        text2: 'Please try again',
        textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 5000,
      });
    }
  };

  return (
    <OpulentSips.Provider
      value={{
        // states
        currentAccount,
        // functions
        getProductsFromStore,
        getOneProductFromStore,
        setProductToCart,
        resetProductCart,
        removeProduct,
        setRecurveProductToCart,
        decreasesQuantityProduct,
        increasesQuantityProduct,
        setFavorite,
        unSetFavorite,
        loginUser,
        logOutUser,
        registerUser,
        addOrder,
      }}>
      {children}
    </OpulentSips.Provider>
  );
};
