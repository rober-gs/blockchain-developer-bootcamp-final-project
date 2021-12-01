import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core';

import { Badge, Space, Tabs } from 'antd'
import { Card } from 'antd';
import { ApartmentOutlined } from '@ant-design/icons';
import { GiftOutlined } from '@ant-design/icons';
import { LikeOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { FormBuyer } from '../../components/Forms/FormBuyer';
import { RegisterSeller } from '../../components/Steps/Seller/RegisterSeller';
import { InProgress } from '../../components/Results/InProgress';
import { InsideDapp } from '../../components/Results/InsideDapp';
import { useAppContext } from '../../AppContext';
import useSeller from '../../hooks/useSeller';
import useContract from '../../hooks/useContract';


const { TabPane } = Tabs;
const { Meta } = Card;

export const RegisterView = () => {
  
    const contract = useContract()
    const { checkRole } = useSeller();
    const { account } = useWeb3React();    
    const { dataContract } = useAppContext();
    const {roleAssigned } = dataContract;
    
     useEffect(() => {
         if(!roleAssigned){            
            checkRole(contract, account);
         }
     }, [account]);

    return (

        <Card  style={{ height: "45%!important" }}          
            cover={ 
                <img
                    
                    style={{ height: "45%!important" }}
                    alt="dappImg"
                    src={"https://gw.alipayobjects.com/mdn/rms_8a4a51/afts/img/A*OB0ERanT0FgAAAAAAAAAAABkARQnAQ"}
                /> 
            }                  
        >     
            <Meta title="Welcome to Decentralized Businesses" description="become part of the community" />
            <Tabs defaultActiveKey="1" centered size="large">
                <TabPane
                    key="Inicio"
                    tab={
                        <span>
                            Instructions
                        </span>
                    }
                >
                    <Badge
                        className="site-badge-count-109"
                        count={1}
                        style={{ backgroundColor: '#52c41a' }}
                    /> Register
                    <br />
                    <br />
                    <Badge
                        className="site-badge-count-109"
                        count={2}
                        style={{ backgroundColor: '#52c41a' }}
                    /> Add your Product
                    <br />
                    <br />
                    <Badge
                        className="site-badge-count-109"
                        count={3}
                        style={{ backgroundColor: '#52c41a' }}
                    /> Enjoy
                    <br />
                    <br />
                </TabPane>
                           
                <TabPane 
                    key="Seller"
                    tab={
                        <span>
                          <ApartmentOutlined />
                          Register
                        </span>
                      } 
                >                    
                    <p>
                        <Space>
                            Register as a seller to sell any product you want to sell 
                            <ExclamationCircleOutlined style={{color:"blue"}}/> You have to provide a refundable down payment that will be taken as a guarantee. 
                        </Space>
                    </p>
                   { 
                    ( roleAssigned )         
                        ? <InsideDapp role={"Admin"} account={"account"} />        
                        : <RegisterSeller />
                    }
                </TabPane>
                <TabPane 
                    key="Buyer"
                    tab={
                        <span>
                            <GiftOutlined />
                            Add Product
                        </span>
                    }
                >                    
                    <p>                            
                        Register as a buyer to purchase any available product.
                    </p>
                    <FormBuyer />
                </TabPane> 
                <TabPane 
                    key="Validator"
                    tab={
                        <span>                            
                            <LikeOutlined />
                            Validator
                        </span>
                    } 
                >
                    <InProgress />
                </TabPane>            
            </Tabs>
        </Card>
    )
}
