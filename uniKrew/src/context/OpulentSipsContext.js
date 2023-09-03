//react import
import {useState, createContext, useEffect} from 'react';

//createContext
export const OpulentSips = createContext();

// requestApi
import getApi from '../requestType/getApi';
import postApi from '../requestType/postApi';

// redux actions
import {useDispatch} from 'react-redux';

export const OpulentSipsProvider = ({children}) => {
  // redux function
  const dispatch = useDispatch();
  // const {isLoading} = useSelector(state => state.loader);

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

  return (
    <OpulentSips.Provider
      value={{
        // states
        currentAccount,
        // functions
        getProductsFromStore,
        getOneProductFromStore,
      }}>
      {children}
    </OpulentSips.Provider>
  );
};
