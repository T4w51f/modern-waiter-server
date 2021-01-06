const { testCreateUser, testGetUserByGoogleId, testGetUserByUserId, testUpdateUserPreferences, testGetUserPreferences, testGetUserPreferenceKeywords } = require('./test_functions')
const { testCreateUserInvalid, testGetUserByUserIdInvalid, testGetUserPreferencesInvalid, testUpdateUserPreferencesInvalid, testUpdateUserPreferencesInvalidAlt} = require('./test_functions_invalid')

describe("Integration test 7: ", () => {
    it("Set up a new user", async done => {
        await testCreateUser()
        await testGetUserByGoogleId()
        await testGetUserByUserId()
        await testGetUserPreferenceKeywords()
        await testGetUserPreferences()
        await testUpdateUserPreferences()
        await testGetUserPreferences()
        done()
    })

    it("Fail to setup a new user", async done => {
        await testCreateUserInvalid()
        await testGetUserByUserIdInvalid()
        await testGetUserPreferencesInvalid()
        await testUpdateUserPreferencesInvalid()
        await testUpdateUserPreferencesInvalidAlt()
        done()
    })
})




