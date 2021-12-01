import { useWeb3React } from '@web3-react/core';
import { useAppContext } from '../AppContext';
import { customFormat } from '../utils/utilities';

const useBalance = () => {    

    const { account, library, active}   = useWeb3React();
    const { balance, setBalance } = useAppContext();
    
    const setBalanceEth = async () => {
        if (library && active && account) {
            const  getBalance = await library.getBalance(account);
            const ethers = customFormat(getBalance);     
            setBalance(ethers);
        }
        else {
            setBalance(0);
        }
    }
    return [balance, setBalanceEth];
}

export default useBalance;

