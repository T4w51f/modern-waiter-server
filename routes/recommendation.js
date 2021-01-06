const mysql = require('mysql')
const sql = require("./../sql_connection.js")
const con = sql.getConnection()
var recommendation = require("../recommendation_logic.js")

/**
 * Gets a recommendation for
 * an item at a specific restaurant unique to the
 * user.
 * @param {*} req Params include userId and restaurantId
 * @param {*} res Returns the recommended item Id with a
 * status code of 200 if successful, otherwise 400
 */
function getItemRecommendation(req, res){
    console.log("GET /recommendation")
    
    let users_id = parseInt(req.params.userId,10)
    let restaurant_id = parseInt(req.params.restaurantId,10)
    
    if (isNaN(users_id) || isNaN(restaurant_id)){
        res.status(400).send("Invalid user and restaurant id types, must be an integer")
        return
    }

    console.log("User: " + users_id)
    console.log("Restaurant: " + restaurant_id)

    let user_query = mysql.format("SELECT preferences FROM users WHERE id = ?", [users_id])
    let desc_query = mysql.format("SELECT id, description FROM items WHERE restaurant_id = ?", [restaurant_id])

    con.query(user_query, function(err, prefResult){
        var preference

        try {
            preference = prefResult[0]["preferences"]
        } catch (error) {
            res.status(400).send({message: "Failed to get user preference, check if userId is valid"})
            return
        }

        con.query(desc_query, function(err, descResult) {
            var descriptionJsonArray = JSON.parse(JSON.stringify(descResult))
            var itemDescriptionMap = new Map()

            descriptionJsonArray.forEach(item => {
                itemDescriptionMap.set(item["id"], item["description"])
            })

            var itemId = recommendation.getRecommendation(preference, itemDescriptionMap)
            res.status(200).send({"itemId" : itemId})
            return
        })
    })
}

/**
 * Gets a general list of common food keywords.
 * @param {*} req Params include userId and restaurantId
 * @param {*} res Returns the recommended item Id with a
 * status code of 200 if successful, otherwise 400
 */
function getKeyWords(req, res){
    console.log("GET /recommendation/keywords")

    var foodVerbs = ["bake", "boil", "fry", "grill", "poach", "roast", "steam"]
    var foodTaste = ["crisp", "crunchy", "hot", "mild", "salty", "savory", "sour", "spicy", "sweet"]
    var foodOptions = ["vegan", "vegetarian", "gluten-free"]
    var proteins = ["chicken", "beef", "pork", "lamb", "prawns", "tuna", "salmon", "tofu", "soy"]
    var drinks = ["water", "pop", "soda", "tea", "coffee", "milkshake", "alcohol"]

    var keywords = 
    {
        "food_verbs" : foodVerbs,
        "food_taste" : foodTaste,
        "food_options" : foodOptions,
        "proteins" : proteins,
        "drinks" : drinks
    }

    res.status(200).send({"keywords" : keywords})
}

module.exports = {getItemRecommendation, getKeyWords}
