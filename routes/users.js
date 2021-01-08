const { pool } = require('./../config')

/**
 * Gets details of a user
 * @param {*} req Params include id
 * @param {*} res Returns the 
 * information with a status code of 200 
 * if successful, otherwise 400
 */
function getUserById(req, res){
    console.log("GET /users/{{id}}")

    let id = parseInt(req.params.id,10)
    if (isNaN(id)){
        res.status(400).send("Invalid id type, must be an integer")
        return
    }
    
    pool.query("SELECT * FROM users WHERE id = $1", [id], function(err, result){
        if(err){
            res.status(400).send(err)
            return
        }
        res.status(200).send(result.rows[0])
        return
    })
}

/**
 * Gets details of a user
 * @param {*} req Params include google id
 * @param {*} res Returns the 
 * information with a status code of 200 
 * if successful, otherwise 400
 */
function getUserByGoogleId(req, res){
    console.log("GET /users/google/{{googleId}}")
    let googleId = req.params.googleId
    pool.query("SELECT * FROM users WHERE google_id = $1", [googleId], function(err, result){
        if(err){
            res.status(400).send(err)
            return
        }
        res.status(200).send(result.rows[0])
        return
    })
}

/**
 * Adds details of a user
 * @param {*} req Params include id
 * @param {*} res Returns a status code of 200 
 * if successful, otherwise 400
 */
function addUser(req, res){
    console.log("POST /users")
    let username = req.body.username
    let email = req.body.email
    let googleId = req.body.googleId
    let preferences = req.body.preferences 

    pool.query("INSERT INTO users (username, email, preferences, google_id) VALUES ($1, $2, $3, $4)", [username, email, preferences, googleId], function(err, result){
        if (err) {
            res.status(400).send(err)
            return
        }
        res.status(200).send()
        return
    })
}

/**
 * Request to get user preferences
 * @param {*} req Params include id
 * @param {*} res Returns preferences with status code
 * 200 if successful, otherwise 400
 */
function getUserPreferences(req, res){
    console.log("GET /users/preferences/{{id}}")

    let id = parseInt(req.params.id,10)
    if (isNaN(id)){
        res.status(400).send("Invalid id type, must be an integer")
        return
    }

    pool.query("SELECT preferences FROM users WHERE id = $1", [id], function(err, result){
        if(err){
            res.status(400).send(err)
            return
        }
        res.status(200).send(result.rows[0])
        return
    })
}

/**
 * Updates user preferences
 * @param {*} req Body includes userId and preferences
 * @param {*} res Returns a status code of 200 
 * if successful, otherwise 400
 */
function updateUserPreferences(req, res){
    console.log("PUT /users")

    let userId = parseInt(req.body.userId,10)
    if(isNaN(userId)){
        res.status(400).send("Invalid user id type, must be an integer")
        return
    }

    let preferences = req.body.preferences

    if(preferences == null){
        res.status(400).send("Preferences can not be null")
        return
    }

    pool.query("UPDATE users SET preferences = $1 WHERE id = $2", [preferences, userId], function(err, result){
        if(err){
            res.status(400).send(err)
            return
        }
        res.status(200).send()
        return
    })
}

module.exports = {getUserById, getUserByGoogleId, addUser, getUserPreferences, updateUserPreferences}
