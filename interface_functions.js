var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12341234"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var server = app.listen(3000,function(){
        var port = server.address().port;
        console.log("Server started listening at %s", port);
    });
});
con.query("USE MODERN_WAITER_DB", function(err,result,fields){
    if (err) throw err;
});
//TODO: Check function return types
/*
Interfaces:
Backend interface for Modern Waiter:

Given, from QR code we get the restaurant id and table id

The following are User API.
*/

//RESTAURANT

/*
Response:
{
    "id": 4,
    "name" : "Jack's diner",
    "location" : "East Vancouver",
    "tax_percentage" : 12.0,
    "service_fee_percentage" : 6.5
} 
*/
function GetRestaurantById(id){
    let sql_query = mysql.format("SELECT * FROM restaurant WHERE id = ?", [id]);
    con.query(sql_query, function(err,result,fields){
        if (err) throw err;
        console.log(result);
        let ret_result = JSON.parse(JSON.stringify(result))
        return(ret_result);
    });
}


//ITEMS

/*
Response:
[{
    "id" : 2,
    "restaurant_id" : 4,
    "name" : "Salad",
    "description" : "blah blah",
    "type" : "Sides",
    "cost" : 5.50,
    "calories" : 200,
    "popularity_count" : 11,
    "image" : "some url or local file path of image in vm"
}, 
{
    "id" : 3,
    "restaurant_id" : 4,
    "name" : "Cheeseburger",
    "description" : "blah blah",
    "type" : "Burger",
    "cost" : 8.50,
    "calories" : 1100,
    "popularity_count" : 19,
    "image" : "some url or local file path of image in vm"
}]
*/

function GetItemsByRestaurantId(restaurantId){
    let sql_query = mysql.format("SELECT * FROM items WHERE restaurant_id = ?", [restaurantId]);
    con.query(sql_query, function(err,result,fields){
        if (err) throw err;
        console.log(result);
        return(result);
    });
}


//ITEMs_OPTIONS
/*
Response:

[{
    "id" : 1,
    "items_id" : 3,
    "options_id" : 1 
},
{
    "id" : 2,
    "items_id" : 3,
    "options_id" : 2 
},
{
    "id" : 3,
    "items_id" : 3,
    "options_id" : 3 
}]
*/
function GetOptionsIdsByItemsId(itemsId){
    let sql_query = mysql.format("SELECT * FROM items_options WHERE items_id = ?", [itemsId]);
    con.query(sql_query, function(err,result,fields){
        if (err) throw err;
        console.log(result);
        return(result);
    });
}



//OPTIONS 
/*
Response:
[{
    "id" : 1,
    "name" : "Tomatoes",
    "cost" : 0 
},
{
    "id" : 2,
    "name" : "Cherries",
    "cost" : 0 
},
{
    "id" : 3,
    "name" : "Avocado",
    "cost" : 1.50 
}]
*/
function GetOptionsById( id){
    let sql_query = mysql.format("SELECT * FROM options WHERE id = ?", [id]);
    con.query(sql_query, function(err,result,fields){
        if (err) throw err;
        console.log(result);
        return(result);
    });
}




//Tables:
/*
Response:

[{"id" : 1,
  "table_number" : 13
}]
*/
function GetTableById(id){
    let sql_query = mysql.format("SELECT * FROM tables WHERE id = ?", [id]);
    con.query(sql_query, function(err,result,fields){
        if (err) throw err;
        console.log(result);
        return(result);
    });
}



//USERS

/*
Response:
{
    "id" : 1,
    "username" : "tawsifh",
    "email" : "tawsif@h.com",
    "created_at" : "11Oct20 blah blah"
}
*/
function GetUserById(id){
    let sql_query = mysql.format("SELECT * FROM users WHERE id = ?", [id]);
    con.query(sql_query, function(err,result,fields){
        if (err) throw err;
        console.log(result);
        return(result);
    });
}




//ORDERS

/*
Request:

[{
    “users_id” : 2
    "tables_id" : 3,
    "restaurant_id" : 1,
    "amount" : 25.0,
    "ordered_at" : "some timestamp",
    "has_paid" : false,
    "is_active_session" : true
}]
*/
function PostOrder(requestBody){
    console.log("IN the postorder function");
    let request = requestBody[0];
    let sql_query = mysql.format("INSERT INTO orders ( users_id, tables_id, restaurant_id, amount,ordered_at, has_paid, is_active_session) VALUES(?,?,?,?,?,?,?)"
    ,[request["users_id"], request["tables_id"], request["restaurant_id"], request["amount"], request["ordered_at"], request["has_paid"], request["is_active_session"]]);
    
    //let sql_query = ("INSERT INTO orders (id, users_id, tables_id, restaurant_id, amount,ordered_at, has_paid, is_active_session) VALUES(" + request["id"] + "," + request["user_id"] + "," +  request["tables_id"] + "," +  request["restaurant_id"] + "," +  request["amount"]  + "," + "\'" + String(request["ordered_at"])+ "\'" + "," +  request["has_paid"]  + "," +  request["is_active_session"] +")");
    con.query(sql_query, function(err,result,fields){
        if (err) {
            console.log(err);
            return false;
        }
        console.log(result);
        return(true);
    });
}



// if you add an item to your order, update the total amount in the order
function UpdateOrderAmountById(orderId, amount){
    let sql_query_get_oldamount = mysql. format("SELECT amount FROM orders WHERE id = ?", [orderId]);
    con.query(sql_query_get_oldamount, function(err,result,fields){
        if (err) {
            console.log(result);
            throw err;
        };
        result=JSON.parse(JSON.stringify(result))[0];
        let old_amount = result["amount"];
        let new_amount = old_amount + amount;
        let sql_query = mysql.format("UPDATE orders SET amount = ? WHERE id = ?", [new_amount, orderId]);
        con.query(sql_query, function(err,result,fields){
            if (err) {
                console.log(err);
                return false;
            };
            return true;
        });
    });
}

// if all the ordered items have been paid for, mark this as has paid 
function UpdateOrderHasPaidFlag(hasPaid, orderId){
    /*
    let sql_query_get_ordered_items_paid_info = mysql. format("SELECT hasPaid FROM ordered_items WHERE id = ?", [orderId]);
    con.query(sql_query_get_ordered_items_paid_info, function(err,result,fields){
        if (err) {
            console.log(result);
            throw err;
        };
        result=JSON.parse(JSON.stringify(result))[0];
       
        console.log(result);
        */
        let sql_query = mysql.format("UPDATE orders SET has_paid = ? WHERE id = ?", [hasPaid,orderId]);
        con.query(sql_query, function(err,result,fields){
            if (err) {
                console.log(err);
                return false;
            };
            console.log(result);
            return true;
        });
    //});
}

// if the session is complete, set the active session flag to false
function UpdateOrderIsActiveSessionFlag(isActive, orderId ){
    let sql_query = mysql.format("UPDATE orders SET is_active_session = ? WHERE id = ?", [isActive, orderId]);
    con.query(sql_query, function(err,result,fields){
        if (err) {
            console.log(err);
            return false;
        };
        console.log(result);
        return true;
    });
}

/*
Response:

[{
    "id" : 1,
    “users_id” : 2
    "tables_id" : 3,
    "restaurant_id" : 1,
    "amount" : 25.0,
    "ordered_at" : "some timestamp",
    "has_paid" : false,
    "is_active_session" : true
}]
*/
function GetOrdersByUserId(users_id, isActive){
    let sql_query = mysql.format("SELECT * FROM orders WHERE users_id = ? && is_active_session = ? ", [users_id, isActive]);
    con.query(sql_query, function(err,result,fields){
        if (err) throw err;
        console.log(result);
        return(result);
    });
}

/*
Response:
[{
    "id" : 1,
    "users_id" : 2
    "tables_id" : 3,
    "restaurant_id" : 1,
    "amount" : 25.0,
    "ordered_at" : "some timestamp",
    "has_paid" : false,
    "is_active_session" : true
},
{
    "id" : 5,
    "users_id" : 4
    "tables_id" : 3,
    "restaurant_id" : 1,
    "amount" : 35.0,
    "ordered_at" : "some timestamp",
    "has_paid" : false,
    "is_active_session" : true
},
{
    "id" : 11,
    "users_id" : 5
    "tables_id" : 3,
    "restaurant_id" : 1,
    "amount" : 10.0,
    "ordered_at" : "some timestamp",
    "has_paid" : false,
    "is_active_session" : true
}]
*/
function GetOrdersByTableId( tables_id, isActive){
    let sql_query = mysql.format("SELECT * FROM orders WHERE tables_id = ? && is_active_session = ? ", [tables_id, isActive]);
    con.query(sql_query, function(err,result,fields){
        if (err) throw err;
        console.log(result);
        return(result);
    });
}

//ORDERED ITEMS

/*
Response:

[{
    "id" : 5,
    "orders_id" : 11
    "items_id" : 2,
    "has_paid" : true,
    “Is_selected” : false
},
{
    "id" : 6,
    "orders_id" : 11
    "items_id" : 3,
    "has_paid" : false,
    “Is_selected: : false
}]

*/
function GetOrderedItemsByOrderId(orderId){
    let sql_query = mysql.format("SELECT * FROM ordered_items WHERE orders_id = ?", [ orderId]);
    con.query(sql_query, function(err,result,fields){
        if (err) throw err;
        console.log(result);
        return(result);
    });
}

// adds a new item to the ordered items table, used when you add an item to your meal later on during your time at the restaurant
function UpdateOrderItemsByOrderId( orderId,  itemId){
    let sql_query = mysql.format("INSERT INTO ordered_items (orders_id, items_id, has_paid, is_selected) VALUES(?,?, 0,0) ", [orderId,itemId]);
    con.query(sql_query, function(err,result,fields){
        if (err) return false;
        console.log(result);
        return true;
    });
}

// if you pay for the specific item, mark it as has paid
function UpdateOrderItemsHasPaidFlag(items_id, orders_id, hasPaid){
    let sql_query = mysql.format("UPDATE ordered_items SET has_paid = ? WHERE orders_id = ? && items_id = ?", [hasPaid, orders_id, items_id]);
    con.query(sql_query, function(err,result,fields){
        if (err) return false;
        console.log(result);
        return true;
    });
    //main();
}

function main(){
    
    GetRestaurantById(1);
    GetItemsByRestaurantId(1);
    GetOptionsIdsByItemsId(1);
    GetOptionsById(1);
    GetTableById(1);
    GetUserById(1);
    /*PostOrder([{
        "id" : Math.ceil(Math.random() * 100),
        "users_id" : 1,
        "tables_id" : 1,
        "restaurant_id" : 1,
        "amount" : 25.0,
        "ordered_at" : "2020-10-20 14:15:11",
        "has_paid" : 0,
        "is_active_session" : 1
    }]);
    */
    GetOrdersByUserId(1,1);
    GetOrdersByTableId(1,1);
    //UpdateOrderAmountById(1,22);
    //UpdateOrderHasPaidFlag(1,2);
    //UpdateOrderIsActiveSessionFlag(1,1);
}

module.exports = {
    GetRestaurantById,
    GetItemsByRestaurantId,
    GetOptionsIdsByItemsId,
    GetOptionsById,
    GetTableById,
    GetUserById,
    PostOrder,
    GetOrdersByUserId,
    GetOrdersByTableId,
    UpdateOrderAmountById,
    UpdateOrderHasPaidFlag,
    UpdateOrderIsActiveSessionFlag,con
};

