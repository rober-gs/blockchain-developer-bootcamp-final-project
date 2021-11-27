import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Button} from 'antd';
import { useCallback } from 'react';
import { useAppContext } from '../AppContext';
import { customFormat, evenIsDefined, toEthers } from '../utils/utilities';


const useSeller = () => {
    
    const { account } = useWeb3React();    
    const {
            dataContract,
            setDataContract,
            transaction,
            setTransaction, 
            uiSetError,
     } = useAppContext();

    const checkRole = useCallback( async (contract, account) => {     
        
        try{
            const DEFAULT_ADMIN_ROLE = await contract.DEFAULT_ADMIN_ROLE();
            const SELLER_ROLE = await contract.SELLER_ROLE();
            const BUYER_ROLE = await contract.BUYER_ROLE();
            const MEDIATOR_ROLE = await contract.MEDIATOR_ROLE();
            
            const roles = [
                DEFAULT_ADMIN_ROLE, 
                SELLER_ROLE,
                BUYER_ROLE,
                MEDIATOR_ROLE
            ]
            
            setDataContract({
                target:"roles",
                data: {...roles}
            });   

            roles.map( i => {                                
                contract.hasRole(i, account).then( assigned =>{                    
                    if(assigned){
                        //simula la funcionalidad de un CASE
                        let roleIndex = {
                            [DEFAULT_ADMIN_ROLE]:"ADMIN_ROLE", 
                            [SELLER_ROLE]:"SELLER_ROLE",
                            [BUYER_ROLE]:"BUYER_ROLE",
                            [MEDIATOR_ROLE]:"MEDIATOR_ROLE" 
                        }
                        setDataContract({
                            target:"roleAssigned",
                            data: roleIndex[i],
                        });

                        return;
                    } 
                });
            });
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
        console.log("registerSeller -->", account);
        try {  

            contract.registerSeller({
                from: account,
                value: toEthers(dataContract.quote.toString()),  
                gasLimit: 210000        
            }).then( tx => {                
                console.log("tx", tx);
                console.log("txhash", tx.hash);
                console.log("confirmations", tx.confirmations);
               
                setTransaction(tx);

                tx.wait(2).then( result => {                    
                    console.log("tx.wait.then( result =>", result);
                    setTransaction( result );
                    console.log(" setTransaction ", transaction);
                });
            });
            
        } catch ({error}) {
            uiSetError({
                target:"errRegisterSeller",
                data: error?.message || error,
            });            
            console.error("Error ", error);   
            
        }
    },[]);

    const unRegisterSeller = useCallback(async( contract ) => {

        try {            

            const tx = await contract.unregisterSeller();
            console.log("object", tx);

            setTransaction({
                ...transaction,
                registerSeller:{
                    ...tx
                }
            });
            console.log("tx", tx, "transaction", transaction) ;

            await tx.wait(2)
            setTransaction({
                ...transaction,
                registerSeller:{
                    ...tx
                }
            }); 
            console.log("tx", tx, "transaction", transaction) ;



            const findEvent = evenIsDefined(tx?.logs)("LogRegisteredSeller");
            console.log("findEvent", findEvent);
            
        } catch ({error}) {
            // setError( {
            //     unRegisterSeller : error?.message 
            // });
            
        } 
    },[]);

    return {dataContract, checkRole, getQuote, registerSeller, unRegisterSeller}
}

export default useSeller
