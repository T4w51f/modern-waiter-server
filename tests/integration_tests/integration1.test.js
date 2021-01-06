const { testCreateOrder, testGetUserOrder, testGetMenu, testGetRecommendation, testGetTableOrder } = require("./test_functions")
const { 
    testCreateOrderInvalid, testCreateOrderInvalidAlt, testGetRecommendationInvalid, 
    testGetUserOrderInvalid, testGetTableOrderInvalid, testGetRecommendationInvalidAlt 
} = require("./test_functions_invalid")

describe("Integration test 1: ", () => {
    it("Setting up a customer table", async done => {
        await testCreateOrder()
        await testGetUserOrder()
        await testGetTableOrder()
        await testGetMenu()
        await testGetRecommendation()
        done()
    })

    it("Setting up a customer table with invalid user and restaurant id", async done => {
        await testCreateOrderInvalid()
        await testCreateOrderInvalidAlt()
        await testGetUserOrderInvalid()
        await testGetTableOrderInvalid()
        await testGetMenu()
        await testGetRecommendationInvalid()
        await testGetRecommendationInvalidAlt()
        done()
    })
})



