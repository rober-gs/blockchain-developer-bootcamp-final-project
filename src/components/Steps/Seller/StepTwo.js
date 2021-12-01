import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core';

import { Result, Spin } from 'antd'
import { Button } from 'antd';
import { Error } from '../../Results/Error';
import { useAppContext } from '../../../AppContext';
import useContract from '../../../hooks/useContract';
import useSeller from '../../../hooks/useSeller';
import { Link } from 'react-router-dom';


export const StepTwo = () => {
   
    const { account } = useWeb3React();    
    const { transaction, uiError, uiLoading } = useAppContext();

    const contract = useContract();
    const { registerSeller } = useSeller();

    const { errRegisterSeller } = uiError;    
    const { regSellerTxHash, regSellerHash } = transaction;

    useEffect(() => {    
        registerSeller(contract);
    }, [account]);

    return (
        

        (errRegisterSeller) 
            ?   <Error error={ errRegisterSeller } />
            :   (!regSellerTxHash) 
                    ?   <Spin size="large" />   
                    :   (regSellerTxHash?.status === 0) 
                            ?    <Result
                                    status="warning"
                                    title="There are some problems with your operation."
                                    extra={
                                        <Button 
                                            type="primary"
                                            key="console"
                                            onClick={ ()=> window.open(`https://rinkeby.etherscan.io/tx/${regSellerTxHash.transactionHash}`, "_blank") }
                                        >
                                            Check Details 
                                        </Button>
                                    }
                                />
                            :   (regSellerTxHash?.status === 1)      
                                ?  <Result
                                        status={"success" }
                                        title={ "Successfully Register!" } 
                                        subTitle={ JSON.stringify(regSellerTxHash, " ", 2 ) }                        
                                        extra={[
                                            <Button 
                                                type="link" 
                                                key="check" 
                                                
                                                onClick={ ()=> window.open(`https://rinkeby.etherscan.io/tx/${regSellerTxHash.transactionHash}`, "_blank") }>
                                                Check transaction
                                            </Button>,
                                            <Button
                                                type="primary"
                                                key="Go"
                                                //onClick={ ()=> window.location.href() }
                                            >
                                                <Link to="/home">Done !</Link>
                                                
                                            </Button>

                                        ]}
                                    />
                                : null
        
    )
}
