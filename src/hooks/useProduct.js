import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { toEthers } from '../utils/utilities';


export const useProduct = () => {
    
    const { account } = useWeb3React();  
    
    const getProducts = useCallback( async( contract ) => {

        try {

            console.log("GET_PROD")
          
          
            await contract.addProduct(
                "Smart Phone",
                "lasted Generation",
                toEthers(".5"),
                { 
                    gasLimit: 210000             
                }
            );
            await contract.addProduct(
                "Smart Phone",
                "lasted Generation",
                toEthers(".5"),
                { 
                    
                    gasLimit: 210000             
                }
            );
            await contract.addProduct(
                "Smart Phone",
                "lasted Generation",
                toEthers(".5", 'ether'),
                { 
                    
                    gasLimit: 210000             
                }
            );
            await contract.addProduct(
                "Smart Phone",
                "lasted Generation",
                toEthers(".5", 'ether'),
                { 
                    gasLimit: 210000             
                }
            );
            

        } catch (error) {
            console.log("error", error)
        }


    },[]);
    
    return{ getProducts }
}
