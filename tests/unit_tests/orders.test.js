const app = require('../../backend_server')
const supertest = require('supertest')
const request = supertest(app)

describe('Test createOrder()', () => {
    it('Creates a new order', async done => {
        // Arrange
        const url = `/orders`
        const req = 
          {
            "userId" : 1,
            "tableId" : 1,
            "restaurantId" : 1,
            "amount" : 0,
            "hasPaid" : 0,
            "isActive" : 0
          }

        // Act
        const response = await request.post(url).send(req)

        // Assert
        expect(response.status).toBe(201)
        done()
      })

      it('Creates a new order with invalid user id', async done => {
        // Arrange
        const url = `/orders`
        const req = 
          {
            "userId" : 9999999,
            "tableId" : 1,
            "restaurantId" : 1,
            "amount" : 0,
            "hasPaid" : 0,
            "isActive" : 0
          }

        // Act
        const response = await request.post(url).send(req)

        // Assert
        expect(response.status).toBe(400)
        done()
      })

      it('Creates a new order with invalid table id', async done => {
        // Arrange
        const url = `/orders`
        const req = 
          {
            "userId" : 1,
            "tableId" : 9999999,
            "restaurantId" : 1,
            "amount" : 0,
            "hasPaid" : 0,
            "isActive" : 0
          }

        // Act
        const response = await request.post(url).send(req)

        // Assert
        expect(response.status).toBe(400)
        done()
      })

      it('Creates a new order with invalid restaurant id', async done => {
        // Arrange
        const url = `/orders`
        const req = 
          {
            "userId" : 1,
            "tableId" : 1,
            "restaurantId" : 9999999,
            "amount" : 0,
            "hasPaid" : 0,
            "isActive" : 0
          }

        // Act
        const response = await request.post(url).send(req)

        // Assert
        expect(response.status).toBe(400)
        done()
      })

      it('Creates a new order with missing user id', async done => {
        // Arrange
        const url = `/orders`
        const req = 
          {
            "tableId" : 1,
            "restaurantId" : 1,
            "amount" : 0,
            "hasPaid" : 0,
            "isActive" : 0
          }

        // Act
        const response = await request.post(url).send(req)

        // Assert
        expect(response.status).toBe(400)
        done()
      })

      it('Creates a new order with missing table id', async done => {
        // Arrange
        const url = `/orders`
        const req = 
          {
            "userId" : 1,
            "restaurantId" : 1,
            "amount" : 0,
            "hasPaid" : 0,
            "isActive" : 0
          }

        // Act
        const response = await request.post(url).send(req)

        // Assert
        expect(response.status).toBe(400)
        done()
      })

      it('Creates a new order with missing restaurant id', async done => {
        // Arrange
        const url = `/orders`
        const req = 
          {
            "tableId" : 1,
            "userId" : 1,
            "amount" : 0,
            "hasPaid" : 0,
            "isActive" : 0
          }

        // Act
        const response = await request.post(url).send(req)

        // Assert
        expect(response.status).toBe(400)
        done()
      })

      it('Creates a new order with missing amount', async done => {
        // Arrange
        const url = `/orders`
        const req = 
          {
            "userId" : 1,
            "tableId" : 1,
            "restaurantId" : 100,
            "hasPaid" : 0,
            "isActive" : 0
          }

        // Act
        const response = await request.post(url).send(req)

        // Assert
        expect(response.status).toBe(400)
        done()
      })

      it('Creates a new order with missing hasPaid', async done => {
        // Arrange
        const url = `/orders`
        const req = 
          {
            "userId" : 1,
            "tableId" : 1,
            "restaurantId" : 100,
            "amount" : 0,
            "isActive" : 0
          }

        // Act
        const response = await request.post(url).send(req)

        // Assert
        expect(response.status).toBe(400)
        done()
      })

      it('Creates a new order with missing isActive', async done => {
        // Arrange
        const url = `/orders`
        const req = 
          {
            "userId" : 1,
            "tableId" : 1,
            "restaurantId" : 100,
            "amount" : 0,
            "hasPaid" : 0
          }

        // Act
        const response = await request.post(url).send(req)

        // Assert
        expect(response.status).toBe(400)
        done()
      })
  })

  describe('Test getUserOrder()', () => {
    it('Gets an existing order', async done => {
        // Arrange
        const userId = 1
        const isActive = 1
        const url = `/orders/user/${userId}?isActive=${isActive}`

        // Act
        const response = await request.get(url)

        // Assert
        expect(response.status).toBe(200)
        done()
      })

      it('Gets an existing order with incorrect userId type', async done => {
        // Arrange
        const userId = 'dummyId'
        const isActive = 1
        const url = `/orders/user/${userId}?isActive=${isActive}`

        // Act
        const response = await request.get(url)

        // Assert
        expect(response.status).toBe(400)
        expect(response.text).toStrictEqual("Invalid users_id or isActive type, must be an integer")
        done()
      })
  })

  describe('Test getTableOrder()', () => {
    it('Gets existing orders at a given table', async done => {
        // Arrange
        const tableId = 1
        const isActive = 1
        const url = `/orders/table/${tableId}?isActive=${isActive}`

        // Act
        const response = await request.get(url)

        // Assert
        expect(response.status).toBe(200)
        expect(response.body[0].id).toStrictEqual(expect.anything())
        expect(response.body[0].tables_id).toStrictEqual(expect.anything())
        expect(response.body[0].users_id).toStrictEqual(expect.anything())
        expect(response.body[0].restaurant_id).toStrictEqual(expect.anything())
        expect(response.body[0].amount).toStrictEqual(expect.anything())
        expect(response.body[0].has_paid).toStrictEqual(expect.anything())
        expect(response.body[0].is_active_session).toStrictEqual(expect.anything())
        done()
      })

      it('Gets existing orders at a given table with incorrect tableId type', async done => {
        // Arrange
        const tableId = "abcd"
        const isActive = 1
        const url = `/orders/table/${tableId}?isActive=${isActive}`

        // Act
        const response = await request.get(url)

        // Assert
        expect(response.status).toBe(400)
        expect(response.text).toStrictEqual("Invalid tables_id or isActive type, must be an integer")
        done()
      })
  })

  describe('Test updateOrderSessionStatus()', () => {
    it('Updates an order session status', async done => {
        // Arrange
        const url = `/orders/session/`

        // Act
        const response = await request
        .put(url)
        .send({"orderId" : 1, "isActive" : 0})
        .set('Accept', 'application/json')

        // Assert
        expect(response.status).toBe(200)
        expect(response.body).toStrictEqual({})
        done()
      })

      it('Updates an existing order session with incorrect orderId type', async done => {
        // Arrange
        const url = `/orders/session/`

        // Act
        const response = await request
        .put(url)
        .send({"orderId" : "abcd", "isActive" : 0})
        .set('Accept', 'application/json')

        // Assert
        expect(response.status).toBe(400)
        expect(response.text).toStrictEqual("Invalid orderId or isActive type, must be an integer")
        done()
      })
  })

  describe('Test updateOrderPaidStatus()', () => {
    it('Updates an order paid status', async done => {
        // Arrange
        const url = `/orders/paid/`

        // Act
        const response = await request
        .put(url)
        .send({"orderId" : 1, "hasPaid" : 0})
        .set('Accept', 'application/json')

        // Assert
        expect(response.status).toBe(200)
        expect(response.body).toStrictEqual({})
        done()
      })

      it('Updates an order paid status using incorrect order id type', async done => {
        // Arrange
        const url = `/orders/paid/`

        // Act
        const response = await request
        .put(url)
        .send({"orderId" : "abcd", "hasPaid" : 0})
        .set('Accept', 'application/json')

        // Assert
        expect(response.status).toBe(400)
        expect(response.text).toStrictEqual("Invalid orderId or isActive type, must be an integer")
        done()
      })
  })

