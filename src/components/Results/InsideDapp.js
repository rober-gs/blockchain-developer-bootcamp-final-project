import React, { useState } from 'react'

import { useWeb3React } from '@web3-react/core';
import { Badge, Button, Result, Card, Spin } from 'antd';
import { SmileOutlined  } from '@ant-design/icons';
import { useAppContext } from '../../AppContext';
import useSeller from '../../hooks/useSeller';
import useContract from '../../hooks/useContract';
import { Error } from './Error';
import { Link } from 'react-router-dom';

export const InsideDapp = ( role ) => {


    const contract = useContract();
    const { account } = useWeb3React();    
    const { dataContract } = useAppContext();
    const { unRegisterSeller ,getProductList } = useSeller();


    const { roleAssigned, unRegSellerTxHash } = dataContract;

    const [Loading, setLoading] = useState(false)
   


    const onClick = () => {

        setLoading(true);
        unRegisterSeller(contract).then(
            setLoading(false)
        );
        getProductList(contract);

        
    }

    return (
       

            (unRegSellerTxHash)
            ?    <Result
                    status={"success" }
                    title={ "Successfully Register!" } 
                    subTitle={ JSON.stringify(unRegSellerTxHash, "", 2 )}                        
                    extra={[
                        <Button 
                            type="primary" 
                            key="check" 
                            onClick={ ()=> window.open(`https://rinkeby.etherscan.io/tx/${unRegSellerTxHash.hash}`, "_blank") }>
                            Check transaction
                        </Button>
                    ]}
                />
            : 
                <Spin spinning={Loading}>
                    <Result
                            key="Great"
                            icon={<SmileOutlined />}
                            title="Great, you are inside!"   
                            subTitle="You are:"                       
                            extra={[
                                <Badge.Ribbon text={ roleAssigned } color="blue">
                                    <Card size="small">
                                        { account }
                                    </Card>
                                </Badge.Ribbon>,
                                <br />,
                                <Button href="/home" type="primary">
                                    Go Home &gt;
                                </Button>,
                                (roleAssigned === "SELLER_ROLE") ? <Button danger onClick={ ()=> { onClick() }}> unregister </Button> : null

                            ]}
                    />
                </Spin>
             
    
    )
}
