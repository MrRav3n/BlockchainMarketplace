const Marketplace = artifacts.require("Marketplace")

require('chai')
.use(require('chai-as-promised'))
.should()

contract('Marketplace', ([seller, buyer]) => {
    let marketplace
    before(async() => {
        marketplace = await Marketplace.deployed()
    })
    describe('deployment', async() => {
        it('should be deployed', async() => {
            assert.notEqual(marketplace.address, 0x0);
        })
    })
    describe('whole marketplace', async() => {
        it('should add product', async() => {
            const sellProduct = await marketplace.productAdd(2, "BMW", "Brand new car", {from: seller});
            const result = sellProduct.logs[0].args
            assert.equal(result.id, 0);
            assert.equal(result.price, 2);
            assert.equal(result.name, "BMW");
            assert.equal(result.description, "Brand new car");
            assert.equal(result.owner, seller);
            await marketplace.productAdd(0, "BMW", "Brand new car", {from: seller}).should.be.rejected;
            await marketplace.productAdd(2, "", "Brand new car", {from: seller}).should.be.rejected;
            await marketplace.productAdd(2, "BMW", "", {from: seller}).should.be.rejected;
        })
        it('should buy product', async() => {
            await marketplace.productAdd(2, "BMW", "Brand new car", {from: seller});
            const buyProduct = await marketplace.buyProduct(0, {from: buyer, value: 20000000000000000000})
            const result = buyProduct.logs[0].args
            assert.equal(result.id, 0)
            assert.equal(result.owner, buyer)
            assert.equal(result.isBought, true)
            await marketplace.buyProduct(0, {from: 		seller, value: 	20000000000000000000}).should.be.rejected;
            await marketplace.buyProduct(1, {from:		buyer, 	value: 	20000000000000000000}).should.be.rejected;
            await marketplace.buyProduct(-1, {from: 	buyer, 	value: 	20000000000000000000}).should.be.rejected;
			 await marketplace.buyProduct(-1, {from: 	buyer, 	value: 	2000000000000000000}).should.be.rejected;
        })
    })
})
