import React, { useState } from "react";
 
import { Button } from 'antd';
import { Space } from 'antd';
import { Modal } from "antd";
import { PoweroffOutlined } from '@ant-design/icons';

const NETWORKS = {

    '0x1':'Ethereum Main Network (Mainnet)',
    '0x3':'Ropsten Test Network',
    '0x4':'Rinkeby Test Network',
    '0x5':'Goerli Test Network',
    '0x2a':'Kovan Test Network',
}

export const Metamask = () => {

    const [state, setState] = useState({            
        ethereum: typeof window.ethereum !== "undefined",        
        loading: false,
        currentAccount: null, 
        chainID: null,
        networkName: null,
    });

    const errorModal = () => {
        Modal.error({
        title: "Please connect to MetaMask.",
        content: "Este explorador no cuenta con la extencion MetaMask",
        });
    };

    const handleAccountsChanged = async(accounts) => {     
                
        if (accounts.length === 0) {
            console.log('Please connect to MetaMask.');
            errorModal();
        } 
        else if (accounts[0] !== state.currentAccount) {

            setState({
                ...state,                 
                currentAccount: accounts[0],
            });
        }
    }

    const handleChainChanged = (chainID) => {       
        
        if (chainID !== state.chainID) {

            let networkName = NETWORKS[chainID];
            setState({
                ...state, 
                chainID,
                networkName,
            });
        }
    }

    const onClick = () => {
        
        window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(handleAccountsChanged )
            .catch((err) => {                
                console.error(err);
            });

        window.ethereum
            .request({ method: 'eth_chainId' })
            .then( handleChainChanged )
            .catch((err) => {                
                console.error(err);
            });
    }

  return (
        <div>

        { !state.ethereum && errorModal() }
    
        <Space style={{ width: "100%" }}>                   
            <Button
                type="primary"
                icon={<PoweroffOutlined />}
                loading={state.loading}
                onClick={() => onClick()}
            >
               Conect width Metamask!
            </Button>
            { state.currentAccount }
            { state.networkName }
        
      </Space>
    </div>
  );
};
