import React, { createContext, useContext, useReducer } from 'react';


const initialContext = {
    uiError:{
        errRegisterSeller: null,
        errUnregisterSeller: null,
        errGetRoles: null
    },
    uiLoading:{
        loadRegisterSeller: null
    },
    balance: null,
    dataContract: {
        quote: null,
        roleAssigned: null,
        productList: []
    },
    transaction:{
        regSellerHash: null,
        regSellerTxHash: null,
        unRegSellerHash: null,
        addProductTxHash: null,
        unRegSellerTxHash: null
    },
};

const appReducer = (state, { type, payload }) => {
    
    const {target, data} = payload;

    switch (type) {
        case TYPES.setUiError:
            return {
                ...state,
                uiError: {
                    ...state.uiError,
                    [target]: data,
                },
            };
        case TYPES.setUiLoading:          
            return {
                ...state,
                uiLoading: {
                    ...state.uiLoading, 
                    [target]: data,
                }
            };        
        case TYPES.setDataContract:          
            return {
                ...state,
                dataContract: {
                    ...state.dataContract,
                    [target]: data,
                },                
            };        
        case TYPES.setBalance:
            return {
                ...state,
                balance: payload,
            };
        case TYPES.setTransaction:
            return {
                ...state,
                transaction: {
                    ...state.transaction,
                    [target]: data,
                },
            };
        default:
            return state;
    }
};

const AppContext = createContext(initialContext);

export const useAppContext = () => useContext(AppContext);
export const AppContextProvider = ({ children }) => {
  
    const [store, dispatch] = useReducer(appReducer, initialContext);

    const contextValue = {

        uiError: store.uiError,
        uiSetError: ( error ) => {
            dispatch({
                type: TYPES.setUiError,
                payload: error
            });
        },
        uiLoading: store.uiLoading,
        uiSetLoading: ( loading ) => {
            console.log("Loading", loading)
            dispatch({
                type: TYPES.setUiLoading,
                payload: loading
            });
        },
        balance: store.balance,
        setBalance: ( balance ) => {
            dispatch({
                type: TYPES.setBalance,
                payload: balance 
            });
        },
        dataContract: store.dataContract,
        setDataContract: ( targetData ) => {          
            dispatch({ 
                type: TYPES.setDataContract,
                payload: targetData
            });
        },
        transaction: store.transaction,
        setTransaction: ( transaction ) => {

            dispatch({ 
                type: TYPES.setTransaction,
                payload: transaction
            });
        },


  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

const TYPES = {
    setUiError:               'Set Error',
    setUiLoading:              'Set Loading',    
    setBalance:               'Set Ethereum Balance',     
    setDataContract:          'Set Data of Contract', 
    setTransaction:           'Set Data transaction',  
}
