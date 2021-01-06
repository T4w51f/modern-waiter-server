const test_menu = [
    {
        "id": 1,
        "restaurant_id": 1,
        "name": "Spicy Ahi Roll",
        "type": "Sushi",
        "cost": 16.5,
        "description": "ocean wise ahi tuna, mango, avocado, asparagus, cucumber, sesame soy paper, wasabi mayo, cripy yam curls",
        "calories": 500,
        "popularity_count": 3,
        "image": "gs://modern-waiter-47e96.appspot.com/dummy-spicy-ahi.jpg"
    },
    {
        "id": 2,
        "restaurant_id": 3,
        "name": "Prawn Crunch Roll",
        "type": "Sushi",
        "cost": 16,
        "description": "crispy prawn, mango, avocado, asparagus, cucumber, sesame soy paper, sriracha mayo, soy glaze",
        "calories": 500,
        "popularity_count": 4,
        "image": "gs://modern-waiter-47e96.appspot.com/dummy-prawn-crunch.jpg"
    }
]

function getMenu(req, res){
    console.log("/items/{{restaurantId}}")
    let restaurantId = req.params.restaurantId
    let result = []

    for(var i = 0; i < test_menu.length; i++){
        if(test_menu[i].restaurantId == restaurantId){
            result.push(test_menu[i])
        }
    }

    res.send(result)
}
