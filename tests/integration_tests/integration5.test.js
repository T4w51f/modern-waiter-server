const{ testAddToMenu, testGetMenuLatestItem } = require("./test_functions")
const{ testGetMenuInvalid, testAddToMenuInvalid, testAddToMenuInvalidAlt } = require("./test_functions_invalid")

describe("Integration test 5: ", () => {
    it("Add Item to Menu and verify", async done => {
        await testAddToMenu()
        await testGetMenuLatestItem()
        done()
    })

    it("Add invalid item to menu", async done => {
        await testAddToMenuInvalid()
        await testAddToMenuInvalidAlt()
        done()
    })

    it("Fail to get menu", async done => {
        await testGetMenuInvalid()
        done()
    })
})