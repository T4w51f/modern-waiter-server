const app = require('../../backend_server')
const supertest = require('supertest')
const request = supertest(app)

// Test variables
var userId = 2
var restaurantId = 2
var tableId = 4
var amount = 51
var orderId
var menu
let name = "testItem" 
let type = "sushi"
let cost = "12.5"
let description = "abc" 
let calories = "123"
let popularityCount = "0"
let image = "" 
var userId

var timestamp = new Date().getTime()
var username = "Integration_test" + timestamp
var googleId = "dummy_google" + timestamp
var email = "integration_test_user" + timestamp + "@gmail.com"
var preferences = "chicken"

var dummyString = "dummy"

async function testGetUserOrderInvalid() {
    // Arrange
    const isActive = 1
    const url = `/orders/user/${dummyString}?isActive=${dummyString}`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(400)
}

async function testGetTableOrderInvalid() {
    // Arrange
    const isActive = 1
    const url = `/orders/table/${dummyString}?isActive=${dummyString}`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(400)
}

async function testGetMenuInvalid() {
    // Arrange
    const url = `/items/${dummyString}`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(400)
}

async function testAddOrderedItemsInvalid() {
    //Arrange
    let req_body =
        {
            "ordered_item_array" : [
                {
                    "orderId"  : dummyString,
                    "itemId"  : dummyString
                },
                {
                    "orderId"  : dummyString,
                    "itemId"  : dummyString
                },
                {
                    "orderId"  : dummyString,
                    "itemId"  : dummyString
                }
            ],
            "userId" : userId
        }
 
    let url = "/ordered-items/"

    //Act
    const res = await request.post(url).send(req_body)

    //Assert
    expect(res.status).toBe(400)
}

async function testGetOrderedItemsInvalid() {
    //Arrange
    let url = "/ordered-items/"
    
    //Act
    const res = await request.get(url + dummyString)

    //Assert
    expect(res.status).toBe(400)
}

async function testCreateStripePaymentInvalidAmount() {
    //Arrange
    let req_body =
        {
            "paymentMethodId" : "pm_card_visa",
            "paymentIntendId" : null,
            "currency" : "cad",
            "useStripeSdk" : true,
            "orderAmount" : dummyString
        }
 
    let url = "/pay"

    //Act
    const res = await request.post(url).send(req_body)

    //Assert
    expect(res.status).toBe(400)
}

async function testCreateStripePaymentIncorrectCVC() {
    //Arrange
    let req_body =
        {
            "paymentMethodId" : "pm_card_cvcCheckFail",
            "paymentIntendId" : null,
            "currency" : "cad",
            "useStripeSdk" : true,
            "orderAmount" : (amount * 100)
        }
 
    let url = "/pay"

    //Act
    const res = await request.post(url).send(req_body)

    //Assert
    expect(res.status).toBe(200)
}

async function testTableSessionDoneInvalid(){
    //Arrange
    let req_body =
        {
            "orderId" : dummyString,
            "isActive" : dummyString
        }
 
    let url = "/orders/session"

    //Act
    const res = await request.put(url).send(req_body)

    //Assert
    expect(res.status).toBe(400)
}

async function testPaidStatusDoneInvalid(){
    //Arrange
    let req_body =
        {
            "orderId" : dummyString,
            "hasPaid" : dummyString
        }
 
    let url = "/orders/paid"

    //Act
    const res = await request.put(url).send(req_body)

    //Assert
    expect(res.status).toBe(400)
}

async function testOrderedItemSelectedInvalid(){
    //Arrange
    let req_body =
        {
            "orderId" : dummyString,
            "itemId" : dummyString,
            "isSelected" : dummyString,
            "userId" : dummyString
        }
    
    let url = "/ordered-items/selected"

    //Act
    const res = await request.put(url).send(req_body)

    //Assert
    expect(res.status).toBe(400)
}

async function testOrderedItemPaidInvalid(){
    //Arrange
    let req_body =
        {
            "orderId" : dummyString,
            "itemId" : dummyString,
            "hasPaid" : dummyString
        }
    
    let url = "/ordered-items/paid"

    //Act
    const res = await request.put(url).send(req_body)

    //Assert
    expect(res.status).toBe(400)
}

async function testAddToMenuInvalid() {
    //Arrange
    let req_body =
        {
            "restaurantId" : dummyString ,
            "name" : name ,
            "type" : type,
            "cost" : dummyString,
            "description" : description ,
            "calories" : dummyString,
            "popularityCount" : dummyString,
            "image" : image 
        }
 
    let url = "/items"

    //Act
    const res = await request.post(url).send(req_body)

    //Assert
    expect(res.status).toBe(400)
}

async function testAddToMenuInvalidAlt() {
    //Arrange
    let req_body =
        {
            "restaurantId" : restaurantId ,
            "cost" : cost,
            "description" : description ,
            "calories" : calories,
            "popularityCount" : popularityCount,
        }
 
    let url = "/items"

    //Act
    const res = await request.post(url).send(req_body)

    //Assert
    expect(res.status).toBe(400)
}

async function testCreateUserInvalid() {
    // Arrange
    const url = `/users`
    const req_body = 
        {
            "username" : username,
            "email" : email
        }

    // Act
    const response = await request.post(url).send(req_body)
    const response2 = await request.post(url).send(req_body) // constraint violation due to duplicate username/email

    // Assert
    expect(response2.status).toBe(400)
}

async function testGetUserByUserIdInvalid() {
    // Arrange
    const url = `/users/${dummyString}`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(400)
}

async function testGetUserPreferencesInvalid() {
    // Arrange
    const url = `/users/preferences/${dummyString}`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(400)
}

async function testUpdateUserPreferencesInvalid() {
    // Arrange
    const url = `/users/preferences/`
    const req_body = 
        {
            "userId" : dummyString,
            "preferences" : dummyString
        }

    // Act
    const response = await request.put(url).send(req_body)

    // Assert
    expect(response.status).toBe(400)
}

async function testUpdateUserPreferencesInvalidAlt() {
    // Arrange
    const url = `/users/preferences/`
    const req_body = 
        {
            "userId" : userId,
            "preferences" : null
        }

    // Act
    const response = await request.put(url).send(req_body)

    // Assert
    expect(response.status).toBe(400)
}

/* Invalid cases functions */
async function testCreateOrderInvalid() {
    // Arrange
    const url = `/orders`
    const req = 
        {
            "userId" : dummyString,
            "tableId" : dummyString,
            "restaurantId" : dummyString,
            "amount" : 0,
            "hasPaid" : 0,
            "isActive" : 1
        }

    // Act
    const response = await request.post(url).send(req)

    // Assert
    expect(response.status).toBe(400)
}

async function testCreateOrderInvalidAlt() {
    // Arrange
    const url = `/orders`
    const req = 
        {
            "userId" : 99999999,
            "tableId" : tableId,
            "restaurantId" : restaurantId,
            "amount" : 0,
            "hasPaid" : 0,
            "isActive" : 1
        }

    // Act
    const response = await request.post(url).send(req)

    // Assert
    expect(response.status).toBe(400)
}

async function testGetRecommendationInvalid() {
    // Arrange
    const url = `/recommendation/${dummyString}/${dummyString}`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(400)
}

async function testGetRecommendationInvalidAlt() {
    // Arrange
    const url = `/recommendation/999999/${restaurantId}`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(400)
}


async function testGetRestaurantInvalid() {
    // Arrange
    const url = `/restaurants/${dummyString}`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(400)
}

async function testAddRestaurantInvalid() {
    // Arrange
    const url = `/restaurants`
    const req_body = {
        "taxPercentage" : dummyString,
        "serviceFeePercentage": dummyString,
        "name" : dummyString,
        "location" : dummyString
    }

    // Act
    const response = await request.post(url).send(req_body)

    // Assert
    expect(response.status).toBe(400)
}

async function testAddRestaurantInvalidAlt() {
    // Arrange
    const url = `/restaurants`
    const req_body = {
        "taxPercentage" : 5,
        "serviceFeePercentage": 5,
    }

    // Act
    const response = await request.post(url).send(req_body)

    // Assert
    expect(response.status).toBe(400)
}

async function testGetTableInvalid() {
    // Arrange
    const url = `/tables/${dummyString}`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(400)
}

async function testAddTableInvalid() {
    // Arrange
    const url = `/tables`
    const req_body = 
        {
            "tableNumber" : dummyString
        }

    // Act
    const response = await request.post(url).send(req_body)

    // Assert
    expect(response.status).toBe(400)
}

async function testTokenRegistrationInvalid() {
    // Arrange
    const url = `/registrationToken`
    const req_body = 
        {
            "orderId" : 1
        }

    // Act
    const response = await request.post(url).send(req_body)

    // Assert
    expect(response.status).toBe(400)
}

async function testUnsubscribeTokenInvalid() {
    // Arrange
    const url = `/unsubscribedToken`
    const req_body = 
        {
            "orderId" : 1
        }

    // Act
    const response = await request.post(url).send(req_body)

    // Assert
    expect(response.status).toBe(400)
}

module.exports = {
    testCreateOrderInvalid, testGetRecommendationInvalid, testGetUserOrderInvalid, testGetTableOrderInvalid,
    testTableSessionDoneInvalid, testPaidStatusDoneInvalid, testAddOrderedItemsInvalid, testGetOrderedItemsInvalid, 
    testOrderedItemSelectedInvalid, testOrderedItemPaidInvalid, testGetRestaurantInvalid, testAddRestaurantInvalid,
    testAddRestaurantInvalidAlt, testGetMenuInvalid, testAddToMenuInvalid, testAddToMenuInvalidAlt,
    testCreateUserInvalid, testGetUserByUserIdInvalid, testGetUserPreferencesInvalid, testUpdateUserPreferencesInvalid,
    testUpdateUserPreferencesInvalidAlt, testGetTableInvalid, testAddTableInvalid, testCreateStripePaymentIncorrectCVC,
    testCreateStripePaymentInvalidAmount, testTokenRegistrationInvalid, testUnsubscribeTokenInvalid, testGetRecommendationInvalidAlt,
    testCreateOrderInvalidAlt
}