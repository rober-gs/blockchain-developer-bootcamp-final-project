// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


import "@openzeppelin/contracts/access/AccessControl.sol";

contract DecentralizedBusinesses is AccessControl {

  bytes32 public constant SELLER_ROLE = keccak256("SELLER");
  bytes32 public constant BUYER_ROLE = keccak256("BUYER");
  bytes32 public constant MEDIATOR_ROLE = keccak256("VALIDATOR");

  uint256 public quoteForSeller;
  uint8 private _decimals = 18;  

  /* 
  * Events
  */
  event LogChangeQuote(uint256 newQuote, address account);
   
  /* 
  * Modifiers
  */
  modifier onlyAdministrator(){
    require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()));
    _;
  }  
  modifier correctQuote(){
    require(msg.value >= quoteForSeller);
    _;
  }  
  constructor(uint quoteSeller){
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    quoteForSeller = quoteSeller * 10 ** decimals();
  }     

  function setQuote(uint256 newQuote) public onlyAdministrator returns(bool result){
    result = _setQuote(newQuote);
    if(result) emit LogChangeQuote(newQuote, _msgSender());
  }
    
  function _setQuote(uint256 newQuote) private returns(bool)  {
    quoteForSeller = newQuote * 10 ** decimals();
    return true;
  }   
  function decimals() public view returns (uint8) {
      return _decimals;
  }
  function registerSeller() public payable  returns(uint idSeller) {
    
  }
  
    


}