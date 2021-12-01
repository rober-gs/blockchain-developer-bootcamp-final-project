import React from 'react'
import { Result, Button } from 'antd';
import { AlertOutlined } from '@ant-design/icons';


export const ErrorMetaMask = () => {
    return (
        <Result
            
            icon={<AlertOutlined />}
            title="Please install MetaMask."
            subTitle="You will be redirected to the Metamask"
            extra={
                <Button 
                    type="primary" 
                    onClick={() =>{window.location.href ="https://metamask.io/"}}
                >
                    Install Metamask 
                </Button>
            }
        />
    )
}
