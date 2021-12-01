
const  { catchRevert, evenIsDefined} = require("./helpers.js");
const DecentralizedBusinesses = artifacts.require("DecentralizedBusinesses");



contract("DecentralizedBusinesses",  accounts => {

    let instance;
    const firstQuote = 1;
    const newQuote = 10;
    const [_owner, alice, bob] = accounts;

    beforeEach(async () => {
        instance = await DecentralizedBusinesses.new(firstQuote, { from: _owner });
    });

    describe(" Quotes ", () => {

        it("Should change the quote",  async() => {
            
            const tx = await instance.setQuote(newQuote);

            assert.equal(
                web3.utils.BN(tx.logs[0].args.newQuote).toString(),
                web3.utils.toWei(newQuote.toString(), "ether"),
                "No se a realizado el Cambio correctamnte"
            );

        });
        it("should fail when you try to modify the quota with an account that does not have the admin role.",  async() => {
            await catchRevert(instance.setQuote(newQuote, { from: alice } ));
        });

    });
    describe(" Seller ", () => {

        it("Should send error, an administrator cannot be a seller.", async() => {

            const cheapQuote = 1;

            await instance.setQuote(cheapQuote);
            await catchRevert( 
                instance.registerSeller({
                    from: _owner, 
                    value: web3.utils.toWei(cheapQuote.toString(), 'ether') 
                })
            );

        });
        it("Should send error, the value sent is less than the quota.", async() => {
            
            const quote = 10;
            const cheapQuote = 1;

            await instance.setQuote(quote);
            await catchRevert(instance.registerSeller( { from: alice, value: web3.utils.toWei(cheapQuote.toString(), 'ether')  } ));
            
        });
        it("Should send error, the account is blacklisted.", async() => {

            const cheapQuote = 1;
       
            await instance.setQuote(cheapQuote);
            await instance.changeBlackList(bob, true);

            await catchRevert(instance.registerSeller( { from: bob, value: web3.utils.toWei(cheapQuote.toString(), 'ether')  } ));
            
        });
        it("Should register the account as a seller.", async() => {
            const cheapQuote = 1;
       
            await instance.setQuote(cheapQuote);
            await instance.changeBlackList(bob, false); 
            const tx = await instance.registerSeller( { from: bob, value: web3.utils.toWei(cheapQuote.toString(), 'ether')  } )
            
            assert(
                evenIsDefined(tx.logs)("LogRegisteredSeller"),
                "Register an seller should emit a For Seller event",
            )
            
        
        });

    });







    
    
});