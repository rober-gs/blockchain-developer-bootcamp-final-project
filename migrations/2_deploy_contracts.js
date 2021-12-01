const contract = artifacts.require("DecentralizedBusinesses");

module.exports = async function (deployer) {

    const accounts = await web3.eth.getAccounts();
	const owner = accounts[0];
    const alice = accounts[9];
    const bob = accounts[8];



    const intance = await deployer.deploy(contract, 1, {
        from: owner
    });
    //Add Seller 
    await intance.registerSeller({
        from: alice,
        value: web3.utils.toWei("1", 'ether')
    });
    await intance.registerSeller({
        from: bob,
        value: web3.utils.toWei("1", 'ether')
    });
    //Add Products 
    await intance.addProduct(
        "Smart Phone",
        "lasted Generation",
        web3.utils.toWei(".5", 'ether'),
        { from: bob }
    );
    await intance.addProduct(
        "Smart Phone",
        "lasted Generation",
        web3.utils.toWei(".5", 'ether'),
        { from: bob }
    );
    await intance.addProduct(
        "Smart Phone",
        "lasted Generation",
        web3.utils.toWei(".5", 'ether'),
        { from: bob }
    );
    await intance.addProduct(
        "Smart Phone",
        "lasted Generation",
        web3.utils.toWei(".5", 'ether'),
        { from: bob }
    );

    const totalProducts = await intance.productCount();
    console.log(web3.utils.BN(totalProducts).toString());

};
