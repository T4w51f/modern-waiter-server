const app = require('../../backend_server')
const supertest = require('supertest')
const request = supertest(app)

describe("Test getOrderedItems()", () =>{

    it("Testing Invalid order id type", async done=> {
        //Arrange
        let param = "Invalid orderId of wrong data type"
        let path = "/ordered-items/"
        
        //Act
        const res = await request.get(path+param)

        //Assert
        expect(res.statusCode).toEqual(400)
        done()
    })
    
    it("Testing valid orderId type", async done=> {
        //Arrange
        let param = "1"
        let path = "/ordered-items/"
        
        //Act
        const res = await request.get(path+param)

        //Assert
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body[0].id).toBe('number')
        expect(typeof res.body[0].orders_id).toBe('number')
        expect(typeof res.body[0].items_id).toBe('number')
        expect(typeof res.body[0].has_paid).toBe('number')
        expect(typeof res.body[0].is_selected).toBe('number')
        expect(typeof res.body[0].users_id).toBe('number')
        done()
    })
})

describe("Test addOrderedItems()", () => {
    it("Test invalid order id", async done=> {
        //Arrange
        let req_body = {
            "ordered_item_array" : [
                {
                    "orderId" : "invalid orderId type",
                    "itemId"  : "1"
                },
                {
                    "orderId" : "2",
                    "itemId"  : "1"
                }
            ],
            "userId" : "1"
        }
        
        let path = "/ordered-items"

        //Act
        const res = await request.post(path).send(req_body)

        //Assert
        expect(res.status).toBe(400)
        expect(res.text).toStrictEqual("Invalid request body - order and item ids must be integers")
        done()
    })

    it("Test invalid items id", async done=> {
        //Arrange
        let req_body = {
            "ordered_item_array" : [
                    {
                        "orderId" : "2",
                        "itemId"  : "1"
                    },
                    {
                        "orderId" : "2",
                        "itemId"  : "invalid type"
                    }
                ],
            "userId" : "1"
        }
        
        let path = "/ordered-items"

        //Act
        const res = await request.post(path).send(req_body)

        //Assert
        expect(res.status).toBe(400)
        expect(res.text).toStrictEqual("Invalid request body - order and item ids must be integers")
        done()
    })

    it("Test valid request body", async done=> {
        //Arrange
        let req_body = {
            "ordered_item_array" : [
                {
                    "orderId"  : 1,
                    "itemId"  : 1
                },
                {
                    "orderId"  : 2,
                    "itemId"  : 1
                }
            ],
            "userId" : "1"
        }
         
        let path = "/ordered-items/"

        //Act
        const res = await request.post(path).send(req_body)

        //Assert
        expect(res.status).toBe(201)
        expect(res.body).toStrictEqual({})
        done()  
    })
})

describe("Test updateSelectedStatus()",() => {
    it("Test invalid order id", async done=> {

        //Arrange
        let req_body =
            [
                {
                    "orderId" : "invalid orderId type",
                    "itemId"  : 1,
                    "userId"  : 1,
                    "isSelected" : 1
                }
            ]
        
        let path = "/ordered-items/selected"

        //Act
        const res = await request.put(path).send(req_body)

        //Assert
        expect(res.status).toBe(400)
        expect(res.text).toStrictEqual("Invalid request body - order, item and user ids and isSelected must be integers")
        done()
    })

    it("Test invalid item id", async done=> {

        //Arrange
        let req_body =
            [
                {
                    "orderId" : 1,
                    "itemId"  : "invalid itemId type",
                    "userId"  : 1,
                    "isSelected" : 1
                }
            ]
        
        let path = "/ordered-items/selected"

        //Act
        const res = await request.put(path).send(req_body)

        //Assert
        expect(res.status).toBe(400)
        expect(res.text).toStrictEqual("Invalid request body - order, item and user ids and isSelected must be integers")
        done()
    })

    it("Test invalid user id", async done=> {

        //Arrange
        let req_body =
            [
                {
                    "orderId" : 1,
                    "itemId"  : 1,
                    "userId"  : "invalid userId type",
                    "isSelected" : 1
                }
            ]
        
        let path = "/ordered-items/selected"

        //Act
        const res = await request.put(path).send(req_body)

        //Assert
        expect(res.status).toBe(400)
        expect(res.text).toStrictEqual("Invalid request body - order, item and user ids and isSelected must be integers")
        done()
    })

    it("Test valid request body - select", async done=>{

        //Arrange
        let req_body =
            {
                "orderId" : 1,
                "itemId" : 1,
                "isSelected" : "1",
                "userId" : 1
            }
         
        let path = "/ordered-items/selected"

        //Act
        const res = await request.put(path).send(req_body)

        //Assert
        expect(res.status).toBe(200)
        expect(res.body).toStrictEqual({})
        done()  
    })

    it("Test valid request body - deselect", async done=>{

        //Arrange
        let req_body =
            {
                "orderId" : 1,
                "itemId" : 1,
                "isSelected" : "0",
                "userId" : 1
            }
         
        let path = "/ordered-items/selected"

        //Act
        const res = await request.put(path).send(req_body)

        //Assert
        expect(res.status).toBe(200)
        expect(res.body).toStrictEqual({})
        done()  
    })
})

describe("Test updateOrderedItemPaidStatus()", () => {
    it("Test invalid order id", async done=> {
        //Arrange
        let req_body =
            [
                {
                    "orderId" : "invalid orderId type",
                    "itemId"  : "1",
                    "hasPaid" : 1
                }
            ]
        
        let path = "/ordered-items/paid"

        //Act
        const res = await request.put(path).send(req_body)

        //Assert
        expect(res.status).toBe(400)
        done()
    })

    it("Test invalid item id", async done=>{

        //Arrange
        let req_body =
            [
                {
                    "orderId" : "2",
                    "itemId"  : "invalid type",
                    "hasPaid" : 1
                }
            ]
        
        let path = "/ordered-items/paid"

        //Act
        const res = await request.put(path).send(req_body)

        //Assert
        expect(res.status).toBe(400)
        done()
    })

    it("Test valid request body - paid", async done=> {

        //Arrange
        let req_body =
            {
                "orderId"  : 1,
                "itemId"  : 1,
                "hasPaid" : 1
            }

        let path = "/ordered-items/paid"

        //Act
        const res = await request.put(path).send(req_body)

        //Assert
        expect(res.status).toBe(201)
        done()  
    })

    it("Test valid request body - not paid", async done=> {

        //Arrange
        let req_body =
            {
                "orderId"  : 1,
                "itemId"  : 1,
                "hasPaid" : 0
            }

        let path = "/ordered-items/paid"

        //Act
        const res = await request.put(path).send(req_body)

        //Assert
        expect(res.status).toBe(201)
        done()  
    })
})
