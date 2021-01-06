const{testCreateOrder, testGetUserOrder, testAddOrderedItems} = require("./test_functions")
const{testAddOrderedItemsInvalid} = require("./test_functions_invalid")

describe("Integration test 2: ", () => {
    it("Adding items to cart", async done => {
        await testCreateOrder()
        await testGetUserOrder()
        await testAddOrderedItems()
        done()
    })

    it("Fail to add items to cart", async done => {
        await testCreateOrder()
        await testGetUserOrder()
        await testAddOrderedItemsInvalid()
        done()
    })
})

