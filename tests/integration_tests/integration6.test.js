const { testGetMenu, testAddRestaurant, testGetRestaurant } = require('./test_functions')
const { testAddRestaurantInvalid, testAddRestaurantInvalidAlt, testGetRestaurantInvalid } = require('./test_functions_invalid')

describe("Integration test 6: ", () => {
    it("Test to add a new restaurant", async done => {
        await testAddRestaurant()
        done()
    })

    it("Test to verify added restaurant, get restaurant menu", async done => {
        await testAddRestaurant()
        await testGetRestaurant()
        await testGetMenu()
        done()
    })

    it("Fail to add new restaurants", async done => {
        await testAddRestaurantInvalid()
        await testAddRestaurantInvalidAlt()
        done()
    })

    it("Fail to get a restaurant", async done => {
        await testGetRestaurantInvalid()
        done()
    })
})