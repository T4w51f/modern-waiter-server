//This document handles server duties for the Firebase Cloud Messaging

//When customers open up their account they should subscribe to a new topic
//Topic value should be the table's orderID
// These registration tokens come from the client FCM SDKs.

var admin = require('firebase-admin');
var serviceAccount = require("./modern-waiter-47e96-firebase-adminsdk-exb5m-82aceb8e76.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://modern-waiter-47e96.firebaseio.com"
});


async function subscribe(registrationToken, orderId){
    console.log("SUBSCRIBED for " + orderId);
    // Subscribe the devices corresponding to the registration tokens to the
    // topic.
    let topic = orderId.toString()
    await admin.messaging().subscribeToTopic(registrationToken, topic)
        .then(response => {
        // See the MessagingTopicManagementResponse reference documentation
        // for the contents of response.
        console.log('Successfully subscribed to topic: ' + topic, response);
        return "Succesfully added user to push notifications list";
        });
    
}
// When payment is done, the customers are being unsubscribed from the abovementioned created subscription
// These registration tokens come from the client FCM SDKs.

async function unsubscribe(registrationToken, orderId){
  console.log("UNSUBSCRIBED for " + orderId);
  
  let topic = orderId.toString()
  // Unsubscribe the devices corresponding to the registration tokens from
  // the topic.
  await admin.messaging().unsubscribeFromTopic(registrationToken, topic)
      .then(response => {
      // See the MessagingTopicManagementResponse reference documentation
      // for the contents of response.
      console.log('Successfully unsubscribed from topic:', response);
      });
    
}

async function push_notification_payment_done(orderId, userId) {
  console.log("Sending payment done push notification");
  let topic = orderId.toString()

  var message = {
    notification: {
      title: 'Payment Completed!',
      body: '' + userId
    }
  };

  // Send a message to devices subscribed to the provided topic.
  await admin.messaging().sendToTopic(topic, message)
    .then(response => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    });
}

async function push_notification_order_received(orderId, userId){
  console.log("Sending order received push notification for topic " + orderId);
  let topic = orderId.toString()

  var message = {
    notification: {
      title: 'Order Received!',
      body: '' + userId
    }
  };

  // Send a message to devices subscribed to the provided topic.
  await admin.messaging().sendToTopic(topic, message)
    .then(response => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    });
}


async function push_notification_item_claimed(orderId) {
  console.log("Sending item claimed push notification");
  let topic = orderId.toString()

  var message = {
    notification: {
      title: 'Item Claimed!'
    }
  };

  // Send a message to devices subscribed to the provided topic.
  await admin.messaging().sendToTopic(topic, message)
    .then(response => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    });
}
module.exports = {push_notification_payment_done, push_notification_order_received, push_notification_item_claimed, subscribe, unsubscribe};
