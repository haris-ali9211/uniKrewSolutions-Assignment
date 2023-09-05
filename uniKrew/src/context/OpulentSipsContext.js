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
} from '../redux/actions/actions';

// toast
import Toast from 'react-native-toast-message';

export const OpulentSipsProvider = ({children}) => {
  // redux function
  const dispatch = useDispatch();
  const {favorites} = useSelector(state => state.favorites);

  // useState hooks
  const [currentAccount, setCurrentAccount] = useState('algo');

  //functions
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
      }}>
      {children}
    </OpulentSips.Provider>
  );
};
