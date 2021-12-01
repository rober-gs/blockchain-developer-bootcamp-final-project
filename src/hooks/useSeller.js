import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { useAppContext } from '../AppContext';
import { customFormat, toEthers } from '../utils/utilities';
import { ethers } from "ethers";

const useSeller = () => {
    
    const { account } = useWeb3React();    
    const {
            dataContract,
            setDataContract,
            setTransaction, 
            uiSetError,
     } = useAppContext();

    const checkRole = useCallback( async (contract, account) => {     
        
        try{
            const DEFAULT_ADMIN_ROLE = await contract.DEFAULT_ADMIN_ROLE();
            const SELLER_ROLE = await contract.SELLER_ROLE();
            const VALIDATOR_ROLE = await contract.VALIDATOR_ROLE();


            
            let ADMIN = await contract.hasRole(DEFAULT_ADMIN_ROLE, account);   
            let SELLER = await contract.hasRole(SELLER_ROLE, account);   

            if(ADMIN){
                setDataContract({
                    target:"roleAssigned",
                    data: "ADMIN_ROLE",
                });

                return;
            } 
            if(SELLER){

                setDataContract({
                    target:"roleAssigned",
                    data: "SELLER_ROLE",
                });

                return;
            } 
            
            
        } catch({ error }){
            uiSetError({
                target:"errGetRoles",
                data: error?.message || error,
            });            
            console.error("Error ", error);            
        }
    },[dataContract?.quote]);

    const getQuote = useCallback( async (contract) => {        
        try{
            const quote = await contract.quoteForSeller();
            setDataContract({
                target:"quote",
                data: customFormat(quote),
            });        
        } catch(error){
            console.error("Error ", error);            
        }
    },[dataContract?.quote]);

    const registerSeller = useCallback(async( contract ) => {
    
        try {  

            contract.registerSeller({
                from: account,
                value: toEthers(dataContract.quote.toString()),  
                gasLimit: 210000        
            }).then( hash => {         

                setTransaction({
                    target: "regSellerHash",
                    data: hash
                });

                hash.wait(2).then( txHash => {                    
                    console.log("tx.wait.then( result =>", txHash);
                    setTransaction({
                        target: "regSellerTxHash",
                        data: txHash
                    });
                });
            });
            
        } catch ({error}) {
            uiSetError({
                target:"errRegisterSeller",
                data: error?.message || error,
            });               
        }
    },[]);

    const unRegisterSeller = useCallback(async( contract ) => {

        // try {            

            contract.unregisterSeller({
                from: account,
                gasLimit: 210000        
            }).then( hash => {         

                setTransaction({
                    target: "unRegSellerHash",
                    data: hash
                });

                hash.wait(2).then( txHash => {                    
                    console.log("tx.wait.then( result =>", txHash);
                    setTransaction({
                        target: "unRegSellerTxHash",
                        data: txHash
                    });
                });
            });
            
        // } catch ({error}) {
        //     uiSetError({
        //         target:"errUnregisterSeller",
        //         data: error?.message || error,
        //     });            
        //     console.error("Error ", error);
        // } 
    },[]);

    const getProductList = useCallback( async( contract ) => {
        try {
            const totalBN =  await contract.productCount();
            const total = ethers.BigNumber.from(totalBN).toNumber();

            const items  = await Promise.all(
                Array.from(Array(total)).map( (i, index) =>  index)       
            );

            const list = await Promise.all( items.map( i => contract.products(i) ));

            setDataContract({
                target: "productList",
                data: list
            });

            localStorage.setItem("productList", JSON.stringify(list));
            
        } catch ({error}) {
            console.log("Error ", error);
        } 
    },[]);

    const addProduct = useCallback(async( contract, { name, description, price } ) => {

        console.log("object", { name, description, price })

            contract.addProduct(
                name,
                description,
                toEthers(price).toString(),
                { 
                    from:account,
                    gasLimit: 210000             
                }
            ).then( hash => {
                hash.wait(2).then( txHash => {
                    setDataContract({
                        target:"addProductTxHash",
                        data: txHash,
                    })
                });

            });
            
            try {            

            
        } catch ({error}) {
                   
            console.error("Error ", error);
        } 
    },[]);
    
    const buyProduct = useCallback(async( contract, { id, price } ) => {

        console.log("buyProduct", { id, price });

            contract.buyProduct(
                id,
                { 
                    from:account,
                    value: price,
                    gasLimit: 210000             
                }
            ).then( hash => {
                hash.wait(2).then( txHash => {
                    setDataContract({
                        target:"buyProductTxHash",
                        data: txHash,
                    })
                });

            });
            
            try {            

            
        } catch ({error}) {
                   
            console.error("Error ", error);
        } 
    },[]);


    return {dataContract, checkRole, getQuote, registerSeller, unRegisterSeller, getProductList, addProduct, buyProduct}
}

export default useSeller
