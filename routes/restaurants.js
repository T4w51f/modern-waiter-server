const mysql = require('mysql')
const sql = require("./../sql_connection.js")
const con = sql.getConnection()

/**
 * Acquires details of a
 * restaurant using the restaurant id
 * @param {*} req Params include id
 * @param {*} res Returns the details with a status code of
 * 200 if successful, otherwise 400
 */
function getRestaurant(req, res){
    console.log("GET /restaurants/{{id}}")

    let id = parseInt(req.params.id,10)
    if (isNaN(id)){
        res.status(400).send("Invalid id type, must be an integer")
        return
    }

    let sql_query = mysql.format("SELECT * FROM restaurant WHERE id = ?", [id])
    con.query(sql_query, function(err, result){
        res.status(200).send(result)
        return
    })
}

/**
 * Adds a restaurant to the database
 * @param {*} req Body with details of a restaurant
 * @param {*} res List of items with a status code of 200 if successful, else 400
 */
function addRestaurant(req, res){
    console.log("POST /restaurants")
    let taxPercentage = parseFloat(req.body.taxPercentage)
    let serviceFeePercentage = parseFloat(req.body.serviceFeePercentage)

    if (isNaN(taxPercentage) || isNaN(serviceFeePercentage)){
        res.status(400).send("Invalid percentages type, must be a double")
        return
    }

    let name = req.body.name
    let location = req.body.location

    let sql_query = mysql.format("INSERT INTO restaurant (name, location, tax_percentage, service_fee_percentage) VALUES (?, ?, ?, ?)", [name, location, taxPercentage, serviceFeePercentage])
    con.query(sql_query, function(err, result){
        if (err) {
            res.status(400).send({code : err.code, errno : err.errno})
            return
        }
        res.status(200).send(result)
        return
    })
}
module.exports = {getRestaurant, addRestaurant}
