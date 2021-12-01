import React, { useEffect } from "react";
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';

import { Modal } from "antd";
import { Button } from 'antd';
import Text from "antd/lib/typography/Text";

import { PoweroffOutlined } from '@ant-design/icons';
import { shortenAddress } from "../../utils/utilities";
import { injected } from "../../utils/connectors";

export const MetaMaskButton = () => {
    
    const { activate, active, account } = useWeb3React();
    
    useEffect(() => {

        if (!account || !active) {
            console.log("CONNECT BTN METAMASK");
            connect();
        }

    }, [account, active])
    
    const connect = async() => {
        await activate(injected, (e)=> {
            if(e instanceof UnsupportedChainIdError){
                errorChain();
            }
        });
    }

    const errorChain = () => {

        let secondsToGo = 3;
        const modal =Modal.error({
            title: "Plase change network",            
            content: `This dapp only allows connections to Rinkeby's network.                      ${secondsToGo} second.`            
        });

        const timer = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
            content: `This dapp only allows connections to Rinkeby's network                      ${secondsToGo} second.`,
            });
        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
            window.location.reload();
        }, secondsToGo * 1000);
    }
    return (
            ! active
            ?
            <Button  
                type="primary"
                onClick={()=> connect()}
                icon={<PoweroffOutlined />}
            >
                Connect with MetaMask
            </Button>
            :
            <>           
                {/* <Tooltip title={account}> */}
                        
                        <Text
                            style={{color:"white"}}
                            copyable={{ text: `${account}`}} 
                        >
                            {shortenAddress(account)}                                
                        </Text>                            
                    
                {/* </Tooltip> */}
            </>

    )
};
