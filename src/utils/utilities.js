import { ethers } from "ethers";

export const toEthers = (value) => ethers.utils.parseEther(value);

export const shortenAddress = (address) => {
    if (!address) return '';
    return !!address && `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;
};

export const customFormat = (weis) => {          
    const wei = ethers.BigNumber.from(weis).toString();                
    const ether = ethers.utils.formatEther(wei);        
    return parseFloat(ether); 
}

export const evenIsDefined = members => variableName => {
    return members
          ? members.find((item) => item.event === variableName)
          : null;        
};
