// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

/// @title  AccessControl 
/// @author OpenZeppelin
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title  Decentralized business layer 
/// @author Roberto Garcia
/// @notice It is intended to be a standard or layer 
///         for the development of purchase and sale projects
///         applicable to any business model. 
/// @dev    This contract is in its first phase of development.
/// @custom:experimental This is an experimental contract.
contract DecentralizedBusinesses is AccessControl {
    
    /// @dev define a public role type
    bytes32 public constant SELLER_ROLE = keccak256("SELLER");
    /// @dev define a public role type 
    bytes32 public constant VALIDATOR_ROLE = keccak256("VALIDATOR");

    enum Stars { One, Two, Three, Four,Five }
    enum State { OnSale, Sold, Qualified } 
    /// @notice is the collateral to become a seller
    /// @dev  in the future this variable will be modified only by consensus.
    uint256 public quoteForSeller;

    /// @notice variable to define the number of decimal places
    uint8 internal decimal;

    /// @notice incremental for products
    uint256 public productCount;
    

    /// @notice Declares a data type to be used to Product.
    /// @dev In this case it is important to register the product's own data in the blockchain.
    struct Product {
        uint256 id;
        string name;
        string description;
        uint256 price;
        State state;
        address seller;
        address buyer;
    }
    /// @notice Relationship of accounts that have been banned from the platform
    /// @dev In the future this relationship should only be modified by consensus.
    mapping(address => bool) private blackList;

    /// @notice Relationship of accounts that have registered as sellers
    mapping(address => mapping(uint => Stars)) private sellers;

    /// @notice Relationship of accounts and amounts 
    mapping(address => uint256) private balances;

    /// @notice Relationship of accounts and amounts 
    mapping(uint256 => Product) public products;

    /// @notice Emitted when a change is made to the quota.
    /// @param newQuote new declared quote
    /// @param account account modifying the quota
    event LogChangeQuote(uint256 newQuote, address account);

    /// @notice Emitted when a seller is registered or deregistered.
    /// @param seller account that change .
    /// @param status account status.
    /// @dev   true: register, false: unregister
    event LogRegisteredSeller(address seller, bool status);
    
    /// @notice Emitted when an account is banned or remove ban
    /// @param validator account that made the change.
    /// @param account account affected.
    /// @param state account status.
    /// @dev false: remove ban,  true: banned
    event LogChangeBlackList(address validator, address account, bool state);

    /// @notice Emitted when a product is registered
    /// @param id producto id.
    /// @param state producto state.
    /// @param seller seller of product
    event LogProduct(uint256 id, State state, address seller);

    /// @notice validates that the value sent is sufficient to cover the quote
    modifier validQuote() {
        require(msg.value >= quoteForSeller, "Value is not enough");
        _;
    }

    /// @notice validates that the account is not assigned Administrator, Validator or Vendor role
    modifier validSeller() {
        require(
            !hasRole(DEFAULT_ADMIN_ROLE, _msgSender()) &&
                !hasRole(VALIDATOR_ROLE, _msgSender()) &&
                !hasRole(SELLER_ROLE, _msgSender()),
            "This account already has a role assigned"
        );
        _;
    }
    /// @notice validates that the account is not banned
    modifier validBlackList() {
        require(blackList[_msgSender()] == false, "This account is banned");
        _;
    }
    /// @notice validate product state
    /// @param id product id
    /// @param state product id
    modifier validateState(uint id, State state){
        require(products[id].state == state);
        _;
    } 
    /// @notice validate product state
    /// @param value product value
    modifier valueEnough(uint value){
        require(msg.value >= value);
        _;
    } 
    /// @notice validate for qualify seller and buyer
    /// @param id product value
    modifier qualifySeller(uint id){
        require( products[id].state == State.Sold 
                && products[id].buyer == _msgSender() );
        _;
    } 
    /// @notice Initializes the contract by defining the administrator,
    ///         the number of decimal places and the quota for vendors.
    /// @param quoteSeller quota for sellers roles
    /// @dev I prefer to initialize my counter to one `productCount ++`
    constructor(uint256 quoteSeller) {

        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        decimal = 18;
        quoteForSeller = quoteSeller * 10 ** decimals();
    }

    receive() external payable {}

    /// @notice to know the balance of the contract
    /// @return balance of the contract
    function balance() public view returns (uint256) {
        return address(this).balance;
    }
    /// @notice to know the balance of the contract
    /// @param account of the contract
    /// @return balance of the account
    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    /// @notice change the quote
    /// @param newQuote the value of the new quote
    /// @dev in the future this function will be called only by consensus.
    function setQuote(uint256 newQuote)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
        returns (bool)
    {
        (bool success) = _setQuote(newQuote);
        require(success, "Error " ); 
        emit LogChangeQuote(quoteForSeller, _msgSender());
        return success;
    
    }
    /// @notice change the quote
    /// @param newQuote the value of the new quote
    /// @dev in the future this function will be called only by consensus.
    function _setQuote(uint256 newQuote) private returns (bool) {
        quoteForSeller = newQuote * 10 ** decimals();
        return true;
    }
    /// @notice consult the number of decimal places set
    /// @return number of decimals placde defined
    function decimals() internal view returns (uint8) {
        return decimal;
    }
    /// @notice add new seller
    function registerSeller()
        public
        payable
        validQuote
        validSeller
        validBlackList
    {
        require(_registerSeller(), " ");
        emit LogRegisteredSeller(_msgSender(), true);
    }
    /// @notice add new seller
    /// @return true: account is register, false: if the account could not be register
    function _registerSeller() internal returns (bool) {

        (bool success, ) = address(this).call{value: msg.value}("");
        require(success, "unable to send value, recipient may have reverted");
        balances[_msgSender()] = msg.value;
        _setupRole(SELLER_ROLE, _msgSender());

        return success;
    }
    /// @notice remove seller
    function unregisterSeller() public onlyRole(SELLER_ROLE) {
        require(_unregisterSeller(), " ");
        emit LogRegisteredSeller(_msgSender(), false);
    }

    /// @notice add new seller
    /// @return true: if account is unregister
    function _unregisterSeller() internal returns (bool) {

        uint value = balances[_msgSender()];

        (bool success, ) = _msgSender().call{ value: value }("");
        require(success, "Unable to send value, recipient may have reverted");
        balances[_msgSender()] -= value;
        renounceRole(SELLER_ROLE, _msgSender());

        return true;
    }
    /// @notice manages the list of banned accounts
    /// @param account account address  
    /// @param state  true: baned, false: not banned
    function changeBlackList(address account, bool state)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        blackList[account] = state;
        emit LogChangeBlackList(_msgSender(), account, state);
    }
    /// @notice add new product
    /// @param name product name  
    /// @param description  product description
    /// @param price product price
    function addProduct(string memory name, string memory description, uint256 price) 
        public 
        onlyRole(SELLER_ROLE)
    {
        (bool success, uint id) = _addProduct(name, description, price);
        require(success, " ERROR ");
        emit LogProduct(id, State.OnSale, _msgSender());
    }
    /// @notice add new product
    /// @param _name product name  
    /// @param _description  product description
    /// @param _price product price
    /// @return true: added, false: not added 
    function _addProduct(string memory _name, string memory _description, uint256 _price) 
    internal
    returns(bool, uint)
    {
        products[productCount] = Product({
            id: productCount,
            name: _name,
            description: _description,
            price: _price,
            state: State.OnSale,
            seller: payable(_msgSender()),
            buyer: payable(address(0))
        });
        uint id = productCount;
        productCount ++;

        return (true, id);
    }
    /// @notice buy product
    /// @param id product id   
    function buyProduct(uint id) 
        public
        payable
        validateState(id, State.OnSale) 
        valueEnough(products[id].price)
    {
        (bool success) = _buyProduct(id);
        require(success," ERROR ");

    }
    /// @notice buy product
    /// @param _id product id 
    function _buyProduct(uint _id)
        public
        payable
        returns (bool)
    { 
        (bool success, ) =  payable(products[_id].seller).call{ value: products[_id].price }("");
        require(success, "Unable to send value, recipient may have reverted");
        products[_id].buyer = _msgSender();
        products[_id].state = State.Sold;
        return true;
    }

    function qualify(uint id, Stars rating) 
        public 
        qualifySeller(id)
    {
        sellers[products[id].seller][id] = rating;
    }

}