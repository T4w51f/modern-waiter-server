process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

const express = require("express")
const app = express()
const push_notification = require("./push_notification.js")
const sql = require("./config.js")
const items = require('./routes/items.js')
const ordered_items = require('./routes/ordered_items.js')
const orders = require('./routes/orders.js')
const payment = require('./routes/payment.js')
const recommendation = require('./routes/recommendation.js')
const restaurants = require('./routes/restaurants.js')
const tables = require('./routes/tables.js')
const users = require('./routes/users.js')
const { pool } = require('./config')

app.use(express.json())

app.listen(process.env.PORT || 3002, () => {
    console.log(`Server listening`)
})

/*********************** REST API routes ****************************/

app.get('/_health', (req, res) => {
    res.status(200).send('ok')
  })

// Routes for items
app.get("/items/:restaurantId", items.getMenu)
app.post("/items", items.addToMenu)

// Routes for ordered items
app.get("/ordered-items/:orderId", ordered_items.getOrderedItems)
app.post("/ordered-items", ordered_items.addOrderedItems)
app.put("/ordered-items/paid", ordered_items.updateOrderedItemPaidStatus)
app.put("/ordered-items/selected", ordered_items.updateSelectedStatus)

// Routes for orders
app.post("/orders", orders.createOrder)
app.get("/orders/user/:users_id", orders.getUserOrder)
app.get("/orders/table/:tables_id", orders.getTableOrder)
app.put("/orders/session", orders.updateOrderSessionStatus)
app.put("/orders/paid", orders.updateOrderPaidStatus)

// Routes for Stripe (external API)
app.get('/key', payment.getStripeKey)
app.post('/pay', payment.createStripePayment)

// Routes for item recommendation
app.get("/recommendation/:userId/:restaurantId", recommendation.getItemRecommendation) 
app.get("/recommendation/keywords", recommendation.getKeyWords) 

// Routes for restaurant
app.get("/restaurants/:id", restaurants.getRestaurant)
app.post("/restaurants", restaurants.addRestaurant)

// Routes for table
app.get("/tables/:id", tables.getTable)
app.post("/tables", tables.addTable)

// Routes for user
app.post("/users", users.addUser)
app.get("/users/:id", users.getUserById)
app.get("/users/google/:googleId", users.getUserByGoogleId)
app.get("/users/preferences/:id", users.getUserPreferences)
app.put("/users/preferences", users.updateUserPreferences)

/**
 * HTTP POST request to register token for
 * push notification service.
 */
app.post("/registrationToken", async (req,res) => {
    console.log("/registrationToken")
    let orderId = req.body.orderId
    let registrationToken = req.body.registrationToken
    console.log(registrationToken)
    
    if(registrationToken === "" || registrationToken === null || registrationToken === undefined) {
        res.status(400).send()
        return
    }

    res.status(200).send(await push_notification.subscribe(registrationToken, orderId))
})

app.post("/unsubscribedToken", async (req,res) => {
    console.log("/unsubscribedToken")
    let orderId = req.body.orderId
    let registrationToken = req.body.registrationToken
    console.log(registrationToken)

    if(registrationToken === "" || registrationToken === null || registrationToken === undefined) {
        res.status(400).send()
        return
    }

    res.status(200).send(await push_notification.unsubscribe(registrationToken, orderId))
})

module.exports = app
