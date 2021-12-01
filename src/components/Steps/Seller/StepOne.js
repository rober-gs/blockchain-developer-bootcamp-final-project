import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core';

import {Col, Statistic, Row } from "antd";

import useBalance from '../../../hooks/useBalance';
import useContract from '../../../hooks/useContract';
import { useAppContext } from '../../../AppContext';
import useSeller from '../../../hooks/useSeller';


export const StepOne = () => {

    const contract = useContract();
    const { account } = useWeb3React();
    const { dataContract } = useAppContext();
    const { getQuote, getProductList } = useSeller();
    const [ balance, refreshBalance ] = useBalance();

    useEffect(() => {       

        getQuote(contract);
        getProductList(contract);
        refreshBalance();
        
    }, [account]);

    const { quote } = dataContract;
    return (
         <> 
            <Row gutter={16}>                
                <Col span={12}>                    
                    <Statistic
                        title="Account Balance"                        
                        value={ balance || "Not available" }                                               
                        precision={2}
                        suffix={ "ETH" || "..." }

                    />
                </Col>
                <Col span={12}>                    
                    <Statistic 
                        title="Quota" 
                        value={ quote || "Not available" } 
                        suffix={ "ETH" || "..." }
                    />                
                </Col>
            </Row>  

        </>
    )
}

