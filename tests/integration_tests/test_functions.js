const app = require('../../backend_server')
const supertest = require('supertest')
const { user } = require('firebase-functions/lib/providers/auth')
const request = supertest(app)

// Test variables
var userId = 2
var restaurantId = 2
var tableId = 4
var tableNumber = 15
var amount = 51
var orderId
var menu
let name = "testItem" 
let type = "sushi"
let cost = "12.5"
let description = "chicken chicken chicken spice mango cucumber" 
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

async function testCreateOrder() {
    // Arrange
    const url = `/orders`
    const req = 
        {
            "userId" : userId,
            "tableId" : tableId,
            "restaurantId" : restaurantId,
            "amount" : 0,
            "hasPaid" : 0,
            "isActive" : 1
        }

    // Act
    const response = await request.post(url).send(req)

    // Assert
    expect(response.status).toBe(201)
}

async function testGetUserOrder() {
    // Arrange
    const isActive = 1
    const url = `/orders/user/${userId}?isActive=${isActive}`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(200)
    expect(response.body[0].id).toStrictEqual(expect.anything())
    expect(response.body[0].tables_id).toStrictEqual(tableId)
    expect(response.body[0].users_id).toStrictEqual(userId)
    expect(response.body[0].restaurant_id).toStrictEqual(restaurantId)
    expect(response.body[0].amount).toStrictEqual(expect.anything())
    expect(response.body[0].has_paid).toStrictEqual(expect.anything())
    expect(response.body[0].is_active_session).toStrictEqual(expect.anything())

    orderId = response.body[0].id
}

async function testGetTableOrder() {
    // Arrange
    const isActive = 1
    const url = `/orders/table/${tableId}?isActive=${isActive}`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(200)
    expect(response.body[0].id).toStrictEqual(expect.anything())
    expect(response.body[0].tables_id).toStrictEqual(tableId)
    expect(response.body[0].users_id).toStrictEqual(userId)
    expect(response.body[0].restaurant_id).toStrictEqual(restaurantId)
    expect(response.body[0].amount).toStrictEqual(expect.anything())
    expect(response.body[0].has_paid).toStrictEqual(expect.anything())
    expect(response.body[0].is_active_session).toStrictEqual(expect.anything())

    orderId = response.body[0].id
}

async function testGetMenu() {
    // Arrange
    const url = `/items/${restaurantId}`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(200)
    expect(response.body[0].id).toStrictEqual(expect.anything())
    expect(response.body[0].restaurant_id).toStrictEqual(restaurantId)
    expect(response.body[0].name).toStrictEqual(expect.anything())
    expect(response.body[0].type).toStrictEqual(expect.anything())
    expect(response.body[0].cost).toStrictEqual(expect.anything())
    expect(response.body[0].description).toStrictEqual(expect.anything())
    expect(response.body[0].calories).toStrictEqual(expect.anything())
    expect(response.body[0].popularity_count).toStrictEqual(expect.anything())
    expect(response.body[0].image).toStrictEqual(expect.anything())

    menu = response.body
}

async function testGetRecommendation() {
    // Arrange
    const url = `/recommendation/${userId}/${restaurantId}`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(200)
    expect(response.body.itemId).toStrictEqual(expect.anything())
}

async function testGetUserPreferenceKeywords() {
    // Arrange
    const url = `/recommendation/keywords`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(200)
    expect(response.body.keywords).toStrictEqual(expect.anything())
}

async function testAddOrderedItems() {
    //Arrange
    let req_body =
    {
        "ordered_item_array" : [
            {
                "orderId"  : orderId,
                "itemId"  : 1
            },
            {
                "orderId"  : orderId,
                "itemId"  : 2
            },
            {
                "orderId"  : orderId,
                "itemId"  : 3
            }
        ],
        "userId" : userId
    }
 
    let url = "/ordered-items/"

    //Act
    const res = await request.post(url).send(req_body)

    //Assert
    expect(res.status).toBe(201)
    expect(res.body).toStrictEqual({})
}

async function testGetOrderedItems() {
    //Arrange
    let url = "/ordered-items/"
    
    //Act
    const res = await request.get(url + orderId)

    //Assert
    expect(res.status).toBe(200)
    expect(typeof res.body[0].id).toBe('number')
    expect(typeof res.body[0].orders_id).toBe('number')
    expect(typeof res.body[0].items_id).toBe('number')
    expect(typeof res.body[0].has_paid).toBe('number')
    expect(typeof res.body[0].is_selected).toBe('number')
    expect(typeof res.body[0].users_id).toBe('number')
}

async function testGetStripeKey() {
    //Arrange
    let url = "/key"
    
    //Act
    const res = await request.get(url)

    //Assert
    expect(res.status).toEqual(200)
    expect(res.body.publishableKey).toStrictEqual(expect.anything())
}

async function testCreateStripePayment() {
    //Arrange
    let req_body =
        {
            "paymentMethodId" : "pm_card_visa",
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
    expect(res.body.clientSecret).toStrictEqual(expect.anything())
}

async function testCreateStripePaymentRequiresAuth() {
    //Arrange
    let req_body =
        {
            "paymentMethodId" : "pm_card_authenticationRequired",
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
    expect(res.body.clientSecret).toStrictEqual(expect.anything())
}

async function testTableSessionDone(){
    //Arrange
    let req_body =
        {
            "orderId" : orderId,
            "isActive" : 0
        }
 
    let url = "/orders/session"

    //Act
    const res = await request.put(url).send(req_body)

    //Assert
    expect(res.status).toBe(200)
}

async function testPaidStatusDone(){
    //Arrange
    let req_body =
        {
            "orderId" : orderId,
            "hasPaid" : 1
        }
 
    let url = "/orders/paid"

    //Act
    const res = await request.put(url).send(req_body)

    //Assert
    expect(res.status).toBe(200)
}

async function testOrderedItemSelected(){
    //Arrange
    let req_body =
        {
            "orderId" : orderId,
            "itemId" : 1,
            "isSelected" : "1",
            "userId" : userId
        }
    
    let url = "/ordered-items/selected"

    //Act
    const res = await request.put(url).send(req_body)

    //Assert
    expect(res.status).toBe(200)
}

async function testOrderedItemDeselected(){
    //Arrange
    let req_body =
        {
            "orderId" : orderId,
            "itemId" : 1,
            "isSelected" : "0",
            "userId" : userId
        }
    
    let url = "/ordered-items/selected"

    //Act
    const res = await request.put(url).send(req_body)

    //Assert
    expect(res.status).toBe(200)
}

async function testOrderedItemPaid(){
    //Arrange
    let req_body =
        {
            "orderId" : orderId,
            "itemId" : 1,
            "hasPaid" : 1
        }
    
    let url = "/ordered-items/paid"

    //Act
    const res = await request.put(url).send(req_body)

    //Assert
    expect(res.status).toBe(201)
}

async function testOrderedItemUnpaid(){
    //Arrange
    let req_body =
        {
            "orderId" : orderId,
            "itemId" : 1,
            "hasPaid" : 0
        }
    
    let url = "/ordered-items/paid"

    //Act
    const res = await request.put(url).send(req_body)

    //Assert
    expect(res.status).toBe(201)
}

async function testAddToMenu() {
    //Arrange
    let req_body =
        {
            "restaurantId" : restaurantId ,
            "name" : name ,
            "type" : type,
            "cost" : cost,
            "description" : description ,
            "calories" : calories,
            "popularityCount" : popularityCount,
            "image" : image 
        }
 
    let url = "/items"

    //Act
    const res = await request.post(url).send(req_body)

    //Assert
    expect(res.status).toBe(200)
}

async function testGetMenuLatestItem() {
    // Arrange
    const url = `/items/${restaurantId}`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(200)

    expect(response.body[response.body.length-1].id).toStrictEqual(expect.anything())
    expect(response.body[response.body.length-1].restaurant_id).toStrictEqual(restaurantId)
    expect(response.body[response.body.length-1].name).toStrictEqual(name)
    expect(response.body[response.body.length-1].type).toStrictEqual(type)
    expect(String(response.body[response.body.length-1].cost)).toStrictEqual(String(cost))
    expect(response.body[response.body.length-1].description).toStrictEqual(description)
    expect(String(response.body[response.body.length-1].calories)).toStrictEqual(String(calories))
    expect(String(response.body[response.body.length-1].popularity_count)).toStrictEqual(String(popularityCount))
    expect(response.body[response.body.length-1].image).toStrictEqual(image)
}

async function testCreateUser() {
    // Arrange
    const url = `/users`
    const req_body = 
        {
            "username" : username,
            "email" : email,
            "googleId" : googleId,
            "preferences" : preferences
        }

    // Act
    const response = await request.post(url).send(req_body)

    // Assert
    expect(response.status).toBe(200)
}

async function testGetUserByGoogleId() {
    // Arrange
    const url = `/users/google/${googleId}`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(200)
    expect(response.body.username).toStrictEqual(username)
    expect(response.body.email).toStrictEqual(email)
    expect(response.body.google_id).toStrictEqual(googleId)
    expect(response.body.preferences).toStrictEqual(preferences)
    expect(response.body.username).toStrictEqual(username)

    userId = response.body.id
}

async function testGetUserByUserId() {
    // Arrange
    const url = `/users/${userId}`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(200)
    expect(response.body.username).toStrictEqual(username)
    expect(response.body.email).toStrictEqual(email)
    expect(response.body.google_id).toStrictEqual(googleId)
    expect(response.body.preferences).toStrictEqual(preferences)
    expect(response.body.username).toStrictEqual(username)
}

async function testGetUserPreferences() {
    // Arrange
    const url = `/users/preferences/${userId}`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(200)
    expect(response.body.preferences).toStrictEqual(preferences)
}

async function testUpdateUserPreferences() {
    // Arrange
    const url = `/users/preferences/`
    const req_body = 
        {
            "userId" : userId,
            "preferences" : "mango cucumber tuna spicy"
        }

    // Act
    const response = await request.put(url).send(req_body)

    // Assert
    expect(response.status).toBe(200)
    preferences = "mango cucumber tuna spicy"
}

async function testGetRestaurant() {
    // Arrange
    const url = `/restaurants/2`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(200)
    /*
    expect(response.body[response.body.length-1].location).toStrictEqual(location)
    expect(response.body[response.body.length-1].name).toStrictEqual(name)
    expect(response.body[response.body.length-1].tax_percentage).toStrictEqual(tax_percentage)
    expect(String(response.body[response.body.length-1].service_fee_percentage)).toStrictEqual(String(service_fee_percentage))
    */
}

async function testAddRestaurant() {
    // Arrange
    const url = `/restaurants`
    const req_body = {
        "taxPercentage" : "12",
        "serviceFeePercentage": "0",
        "name" : "Best Restaurant",
        "location" : "Calgary"
    }

    // Act
    const response = await request.post(url).send(req_body)

    // Assert
    expect(response.status).toBe(200)
}

async function testGetTable() {
    // Arrange
    const url = `/tables/${tableId}`

    // Act
    const response = await request.get(url)

    // Assert
    expect(response.status).toBe(200)
}

async function testAddTable() {
    // Arrange
    const url = `/tables`
    const req_body = 
        {
            "tableNumber" : tableNumber
        }

    // Act
    const response = await request.post(url).send(req_body)

    // Assert
    expect(response.status).toBe(200)
}
let firebase_token = "fAv-GymGSmuArAwDwS50Cu:APA91bHsB1AnSZYCejt3QdgIKgdu0poQAl9Vz9Lq6AwKnQNG1Rs4G8JZ7HoRlfhwb7aFzI92Pc95HWMIO_MxhEzq3JGPKDcLUL5rFMcQuLUvBunZq3LwJ4EQFMb6OU8HIvEvYMw4gQZZ";

async function testTokenRegistration() {
    // Arrange
    const url = `/registrationToken`
    const req_body = 
        {
            "orderId" : 1,
            "registrationToken" : "fAv-GymGSmuArAwDwS50Cu:APA91bHsB1AnSZYCejt3QdgIKgdu0poQAl9Vz9Lq6AwKnQNG1Rs4G8JZ7HoRlfhwb7aFzI92Pc95HWMIO_MxhEzq3JGPKDcLUL5rFMcQuLUvBunZq3LwJ4EQFMb6OU8HIvEvYMw4gQZZ"
        }

    // Act
    const response = await request.post(url).send(req_body)

    // Assert
    expect(response.status).toBe(200)
}

async function testUnsubscribeToken() {
    // Arrange
    const url = `/unsubscribedToken`
    const req_body = 
        {
            "orderId" : 1,
            "registrationToken" : "fAv-GymGSmuArAwDwS50Cu:APA91bHsB1AnSZYCejt3QdgIKgdu0poQAl9Vz9Lq6AwKnQNG1Rs4G8JZ7HoRlfhwb7aFzI92Pc95HWMIO_MxhEzq3JGPKDcLUL5rFMcQuLUvBunZq3LwJ4EQFMb6OU8HIvEvYMw4gQZZ"

        }

    // Act
    const response = await request.post(url).send(req_body)

    // Assert
    expect(response.status).toBe(200)
}

module.exports = {
    testCreateOrder, testPaidStatusDone, testGetUserOrder, testGetMenu, 
    testGetRecommendation, testAddOrderedItems, testGetOrderedItems, testOrderedItemPaid,
    testGetStripeKey, testCreateStripePayment, testGetTableOrder, testTableSessionDone, 
    testOrderedItemSelected, testCreateUser, testGetUserByGoogleId, testGetUserByUserId, 
    testGetUserPreferences, testUpdateUserPreferences, testAddToMenu, testGetMenuLatestItem,
    testOrderedItemUnpaid, testOrderedItemDeselected, testGetRestaurant, testAddRestaurant,
    testGetTable, testAddTable, testCreateStripePaymentRequiresAuth, testTokenRegistration,
    testUnsubscribeToken, testGetUserPreferenceKeywords
}
