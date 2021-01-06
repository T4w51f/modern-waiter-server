const{ testCreateOrder, testGetUserOrder, testGetTableOrder, testAddOrderedItems, testGetOrderedItems } = require("./test_functions")
const{ testGetOrderedItemsInvalid } = require("./test_functions_invalid")

describe("Integration test 3: ", () => {
    it("View bill for user", async done => {
        await testCreateOrder()
        await testGetUserOrder()
        await testAddOrderedItems()
        await testGetOrderedItems()
        done()
    })

    it("View bill for table", async done => {
        await testCreateOrder()
        await testGetTableOrder()
        await testAddOrderedItems()
        await testGetOrderedItems()
        done()
    })

    it("Fail to view bill for table", async done => {
        await testCreateOrder()
        await testGetTableOrder()
        await testAddOrderedItems()
        await testGetOrderedItemsInvalid()
        done()
    })
})