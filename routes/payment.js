const express = require('express')
const env = require("dotenv").config({ path: "./.env" })
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const { push_notification_payment_done } = require('../push_notification.js')

/**
 * Gets the stripe key required to pay for
 * an order
 * @param {*} req 
 * @param {*} res Publishable key with status code 200.
 */
function getStripeKey(req, res){
    console.log("GET /key")
    res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY })
    return
}

/**
 * Makes a payment via the Stripe API
 * @param {*} req Body includes paymentMethodId, paymentIntentId, currency, useStripeSdk, orderAmount
 * @param {*} res Status code 200 if successful, otherwise 400.
 */
async function createStripePayment(req, res){
    console.log("POST /pay")

    let paymentMethodId = req.body.paymentMethodId
    let paymentIntentId = req.body.paymentIntentId
    let currency = req.body.currency
    let useStripeSdk = req.body.useStripeSdk
    let orderAmount = parseFloat(req.body.orderAmount)
    console.log(req.body.orderId)
    let orderId = parseInt(req.body.orderId,10)

    if(isNaN(orderAmount)){
        res.status(400).send("Invalid order amount type - must be a double") 
        return
    }

    const generateResponse = intent => {
        // Generate a response based on the intent's status
        switch (intent.status) {
            case "requires_action":
            // Card requires authentication
            return {
                requiresAction: true,
                clientSecret: intent.client_secret
            }
            case "succeeded":
            // Payment is complete, authentication not required
            // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
            return { clientSecret: intent.client_secret }
        }
    }

    try {
        let intent            
        // Create new PaymentIntent with a PaymentMethod ID from the client.
        intent = await stripe.paymentIntents.create({
            amount: orderAmount,
            currency: currency,
            payment_method: paymentMethodId,
            confirmation_method: "manual",
            confirm: true,
            // If a mobile client passes `useStripeSdk`, set `use_stripe_sdk=true`
            // to take advantage of new authentication features in mobile SDKs
            use_stripe_sdk: useStripeSdk,
        })
        res.send(generateResponse(intent))
        console.log("Sending payment done notification for orderId: " + orderId)
        await push_notification_payment_done(orderId, req.body.userId)
        return
    } catch (e) {
        // Handle "hard declines" e.g. insufficient funds, expired card, etc
        // See https://stripe.com/docs/declines/codes for more
        res.send({ error: e.message })
        return
    }
}

module.exports = {getStripeKey, createStripePayment}