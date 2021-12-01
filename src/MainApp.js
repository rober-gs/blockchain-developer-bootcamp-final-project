import React from 'react'

import { Web3ReactProvider } from '@web3-react/core';
import { AppContextProvider } from './AppContext'
import { ethers } from 'ethers';

import { Dashboard } from './layouts/Dashboard';
import { ErrorMetaMask } from './views/ErrorMetaMask';


export const MainApp = () => {
    
    const library = (provider) => new ethers.providers.Web3Provider(provider);  
    
    if( window?.ethereum){ 
        const accoundChange = window?.ethereum.on("accountsChanged",() => window.location.reload());
    }
    return (
        !window.ethereum 
        ? <ErrorMetaMask />
        : <AppContextProvider>
                <Web3ReactProvider getLibrary={library}>
                        <Dashboard />            
                </Web3ReactProvider>
            </AppContextProvider>
    )
}
