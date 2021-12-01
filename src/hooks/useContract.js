import { useMemo } from 'react';
import { Contract } from '@ethersproject/contracts';
import { AddressZero } from '@ethersproject/constants';
import { useWeb3React } from '@web3-react/core';
import json from '../contracts/DecentralizedBusinesses.json';

const useContract = () => {

    const {address,  abi} =  json;

    if (address === AddressZero || !address) throw Error(`Invalid 'contractAddress' parameter '${address}'.`);
    
    const { library, account } = useWeb3React();
    const signerOrProvider = account ? library.getSigner(account).connectUnchecked() : library;

    return useMemo(() => {
        return new Contract(address, abi, signerOrProvider);
    }, [address, abi, signerOrProvider]);
}

export default useContract;
