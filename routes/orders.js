const { pool } = require('./../config')

 /**
  * Creates an order
  * @param {*} req Body includes userId, tableId, restaurantId, amount, hasPaid, isActive
  * @param {*} res Status 200 if successful, else 400 for invalid ids or missing keys
  */
function createOrder(req, res){
    console.log("POST /orders")
    let userId = parseInt(req.body.userId,10)
    let tableId = parseInt(req.body.tableId,10)
    let restaurantId = parseInt(req.body.restaurantId,10)
    let amount = parseFloat(req.body.amount)
    let hasPaid = parseInt(req.body.hasPaid,10)
    let isActive = parseInt(req.body.isActive,10)

    if (isNaN(userId) || isNaN(tableId) || isNaN(restaurantId) || isNaN(amount)){
        res.status(400).send("Invalid request body - user, table, restaurant ids, and hasPaid and isActive must be integers, amount must be a double")
        return
    }

    pool.query("INSERT INTO orders ( users_id, tables_id, restaurant_id, amount, has_paid, is_active_session) VALUES($1,$2,$3,$4,$5,$6)", [userId, tableId, restaurantId, amount, hasPaid, isActive], function(err, result){
        if(err){
            res.status(400).send(err)
            return
        }
        res.status(201).send()
        return
    })
}

/**
  * Retrieve order details of a specific user by their user Id
  * and active session status.
  * @param {*} req Param includes user id, query includes isActive flag
  * @param {*} res Status 200 if successful
  */
function getUserOrder(req, res){
    console.log("GET /orders/user/{{userId}}")
    
    let users_id = parseInt(req.params.users_id,10)
    let isActive = parseInt(req.query.isActive,10)

    if (isNaN(users_id) || isNaN(isActive)){
        res.status(400).send("Invalid users_id or isActive type, must be an integer")
        return
    }

    pool.query("SELECT * FROM orders WHERE users_id = $1 && is_active_session = $2 ", [users_id, isActive], function(err, result){
        if(err){
            res.status(400).send(err)
            return
        }
        res.status(200).send(result.rows)
        return
    })
}

/**
  * Retrieve order details of a specific table by the table Id
  * and active session status.
  * @param {*} req Param includes user id, query includes isActive flag
  * @param {*} res Status 200 if successful
  */
function getTableOrder(req, res){
    console.log("GET /orders/table/{{tableId}}")

    let tables_id = parseInt(req.params.tables_id,10)
    let isActive = parseInt(req.query.isActive,10)

    if (isNaN(tables_id) || isNaN(isActive)) {
        res.status(400).send("Invalid tables_id or isActive type, must be an integer")
        return
    }

    pool.query("SELECT * FROM orders WHERE tables_id = $1 && is_active_session = $2 ", [tables_id, isActive], function(err, result) {
        if(err){
            res.status(400).send(err)
            return
        }
        res.status(200).send(result.rows)
        return
    })
}

/**
 * Updates the session of orders
 * at a specific table. This is used to keep track 
 * of active and inactive sessions. If a group of
 * users finish their meal, we will use this to 
 * mark the session as complete.
 * @param {*} req Body includes orderId and isActive flag
 * @param {*} res Status 200 if successful, 400 if missing isActive for valid orderId
 */ 
function updateOrderSessionStatus(req, res){
    console.log("PUT /orders/session")

    let orderId = parseInt(req.body.orderId,10)
    let isActive = parseInt(req.body.isActive,10)

    if (isNaN(orderId) || isNaN(isActive)){
        res.status(400).send("Invalid orderId or isActive type, must be an integer")
        return
    }

    pool.query("UPDATE orders SET is_active_session = $1 WHERE id = $2", [isActive, orderId], function(err, result){
        if(err){
            res.status(400).send(err)
            return
        }
        res.status(200).send()
        return
    })
}


/**
 * Marks whether an entire order has been paid off. 
 * This is a layer of protection to ensure a user 
 * does not create a double payment for an order 
 * that has been paid for already.
 * @param {*} req Body includes orderId and hasPaid flag
 * @param {*} res Status 200 if successful, 400 if missing hasPaid for valid orderId
 */ 
function updateOrderPaidStatus(req, res){
    console.log("PUT /orders/paid")

    let orderId = parseInt(req.body.orderId,10)
    let hasPaid = parseInt(req.body.hasPaid,10)

    if (isNaN(orderId) || isNaN(hasPaid)){
        res.status(400).send("Invalid orderId or isActive type, must be an integer")
        return
    }

    pool.query("UPDATE orders SET has_paid = $1 WHERE id = $2", [hasPaid,orderId], function(err, result) {
        if(err){
            res.status(400).send(err)
            return
        }
        res.status(200).send()
        return
    })
}

module.exports = {createOrder, getUserOrder, getTableOrder, updateOrderSessionStatus, updateOrderPaidStatus}