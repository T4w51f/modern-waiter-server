const pool = require("../config.js")

/**
 * Gets details of the table
 * a user is seated at
 * @param {*} req Params include id
 * @param {*} res It returns the 
 * information with a status code of 200 
 * if successful, otherwise 400
 */
function getTable(req, res) {    
    console.log("GET /tables/{{id}}")

    let id = parseInt(req.params.id,10)
    if (isNaN(id)){
        res.status(400).send("Invalid id type, must be an integer")
        return
    }

    pool.query("SELECT * FROM tables WHERE id = ?", [id], function(err, result){
        res.status(200).send(result[0])
        return
    })
}

/**
 * Adds details of a table
 * @param {*} req Body includes tableNumber
 * @param {*} res It returns a status code of 200 
 * if successful, otherwise 400
 */
function addTable(req, res) {    
    console.log("POST /tables")

    let tableNumber = parseInt(req.body.tableNumber,10)
    if(isNaN(tableNumber)){
        res.status(400).send("Invalid table number type, must be an integer")
        return
    }

    pool.query("INSERT INTO tables (table_number) VALUES (?)", [tableNumber], function(err, result){
        res.status(200).send(result)
        return
    })
}

module.exports = {getTable, addTable}