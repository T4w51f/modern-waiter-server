const { testGetTable, testAddTable } = require('./test_functions')
const { testGetTableInvalid, testAddTableInvalid } = require('./test_functions_invalid')

describe("Integration test 8: ", () => {
    it("Set up a new table", async done => {
        await testAddTable();
        await testGetTable();
        done()
    })

    it("Fail to setup a new table", async done => {
        await testAddTableInvalid();
        await testGetTableInvalid();
        done()
    })
})




