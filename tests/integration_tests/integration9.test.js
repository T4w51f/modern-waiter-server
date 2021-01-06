const { testTokenRegistration, testUnsubscribeToken } = require('./test_functions')
const { testTokenRegistrationInvalid, testUnsubscribeTokenInvalid } = require('./test_functions_invalid')

describe("Integration test 9: ", () => {
    it("Register for push notifications", async done => {
        await testTokenRegistration();
        done()
    })

    it("Unsubscribe from push notifications", async done => {
        await testUnsubscribeToken();
        done()
    })

    it("Register for push notifications with missing registration token", async done => {
        await testTokenRegistrationInvalid();
        done()
    })

    it("Unsubscribe from push notifications with missing registration token", async done => {
        await testUnsubscribeTokenInvalid();
        done()
    })
    //Need to write more tests to achieve coverage 100% for push notifications
})




