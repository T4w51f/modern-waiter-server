const { 
    testTableSessionDone, testPaidStatusDone, testOrderedItemSelected, testOrderedItemDeselected, 
    testOrderedItemPaid, testOrderedItemUnpaid, testGetUserOrder, testAddOrderedItems, 
    testGetStripeKey, testCreateStripePayment, testCreateOrder, testCreateStripePaymentRequiresAuth
} = require("./test_functions")

const { 
    testTableSessionDoneInvalid, testPaidStatusDoneInvalid, testOrderedItemSelectedInvalid, 
    testOrderedItemPaidInvalid, testCreateStripePaymentIncorrectCVC, testCreateStripePaymentInvalidAmount
} = require("./test_functions_invalid")


describe("Integration test 4: ", () => {
    it("User selects the items to be paid", async done => {
        await testCreateOrder()
        await testGetUserOrder()
        await testAddOrderedItems()
        await testOrderedItemSelected()
        done()
    })

    it("Pay for all the items", async done => {
        await testCreateOrder()
        await testGetUserOrder()
        await testAddOrderedItems()
        await testGetStripeKey()
        await testCreateStripePayment()
        await testOrderedItemPaid()
        await testTableSessionDone()
        await testPaidStatusDone()
        done()
    })

    it("Requires auth for payment", async done => {
        await testGetStripeKey()
        await testCreateStripePaymentRequiresAuth()
        done()
    })    

    it("Invalid CVC during payment", async done => {
        await testGetStripeKey()
        await testCreateStripePaymentIncorrectCVC()
        done()
    })

    it("Invalid amount entered during payment", async done => {
        await testGetStripeKey()
        await testCreateStripePaymentInvalidAmount()
        done()
    })

    it("Pay for all the items but fail to update paid and session statuses", async done => {
        await testGetStripeKey()
        await testCreateStripePayment()
        await testOrderedItemPaid()
        await testTableSessionDoneInvalid()
        await testPaidStatusDoneInvalid()
        done()
    })

    it("Pay for individual items but fail to update paid and session statuses", async done => {
        await testGetStripeKey()
        await testCreateStripePayment()
        await testOrderedItemSelectedInvalid()
        await testOrderedItemPaidInvalid()
        done()
    })

    it("Not paying for an item and deselecting it", async done => {
        await testGetStripeKey()
        await testCreateStripePayment()
        await testOrderedItemDeselected()
        await testOrderedItemUnpaid()
        done()
    })
    
})


