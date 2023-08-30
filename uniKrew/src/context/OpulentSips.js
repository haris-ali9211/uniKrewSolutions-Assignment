import {useState, createContext} from 'react';
export const OpulentSips = createContext();

export const OpulentSipsProvider = ({children}) => {
  const [currentAccount, setCurrentAccount] = useState('algo');

  return (
    <OpulentSips.Provider
      value={{
        currentAccount,
      }}>
      {children}
    </OpulentSips.Provider>
  );
};
