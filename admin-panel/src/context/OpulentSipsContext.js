//react import
import { useState, createContext, useEffect } from "react";

// request api's
import getApi from "../requestApi/getApi";
import postApi from "../requestApi/postApi";

//createContext
export const OpulentSips = createContext();

export const OpulentSipsProvider = ({ children }) => {
  // useState hooks
  const [currentAccount, setCurrentAccount] = useState("algo");

  const getAllOrder = async () => {
    const data = await getApi(`order/getAllOrder`);
    if (data) {
      return data;
    } else {
      return null;
    }
  };

  const getAllUser = async () => {
    const data = await getApi(`user/getUsers`);
    if (data) {
      return data;
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
        getAllOrder,
        getAllUser,
      }}
    >
      {children}
    </OpulentSips.Provider>
  );
};
