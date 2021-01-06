//This document includes service interfaces that communicates with the database

/*
    Necessary functionalities:
            Process:
                - Users scan the barcode and 
                - Users view the bill and select 3 payment/splitting options
                    1) Pay the whole bill:
                        The selected user goes ahead and pays the entire balance
                        Callable methods:
                            JSON retrieveOrderDetails(restaurantID,tableID)
                            Int getTotalBalance(restaurantID, tableID)

                            bool createPaymentMethod(JSON credentials)
                            bool updatePaymentMethod(paymentID, JSON credentials)
                            JSON getRegisteredPaymentMethods(userID?)
                            deletePaymentMethod(paymentID)
                            Boolean Pay(paymentID, userID, Int amount)
                    2) Split even
                        Number of users retrieved, total bill retrieved, user accounts opened, shared evently and transferred to user balances
                        Callable methods:
                            JSON retrieveOrderDetails(restaurantID,tableID)
                            JSON retrieveUserDetails(restaurantID,tableID)
                            Int getTotalBalance(restaurantID, tableID)

                            Bool createUserBalance(restaurantID, tableID, userID)
                            Int getUserBalance(restaurantID, tableID, userID)
                            Bool deleteUserBalance(restaurantID, tableID, userID)


                            bool createPaymentMethod(JSON credentials)
                            bool updatePaymentMethod(paymentID, JSON credentials)
                            JSON getRegisteredPaymentMethods(userID?)
                            deletePaymentMethod(paymentID)
                            Boolean Pay(paymentID, userID, Int amount)

                    3) Pay what you ate
                        Total bill retrieved, ordered items retrieved, user accounts opened, upon claim of items user balances updated
                        Callable methods:
                            JSON retrieveOrderDetails(restaurantID,tableID)
                            JSON retrieveUserDetails(restaurantID,tableID)
                            Int getTotalBalance(restaurantID, tableID)

                            Bool createUserBalance(restaurantID, tableID, userID)
                            Bool addtoUserBalance(restaurantID, tableID, userID, ItemID)
                            Bool removefromUserBalance(restaurantID, tableID, userID, ItemID)
                            Int getUserBalance(restaurantID, tableID, userID)
                            Bool deleteUserBalance(restaurantID, tableID, userID)


                            bool createPaymentMethod(JSON credentials)
                            bool updatePaymentMethod(paymentID, JSON credentials)
                            JSON getRegisteredPaymentMethods(userID?)
                            deletePaymentMethod(paymentID)
                            Boolean Pay(paymentID, userID, Int amount)
                -Upon closing of balance, success screen is displayed
            

    //<<<<<<<<ORDER SPLITTING METHODS>>>>>>>>>>>>
    
    //Returns Ordered Items, with quantities, extras, price in a JSON format
    JSON retrieveOrderDetails(restaurantID,tableID)

    //Don't know how exactly this will be used. I think userID's who scanned needs to be returned
    JSON retrieveUserDetails(restaurantID,tableID)

    //Checks the current balance on the bill. 
    //If someone already paid his/her own part than balance needs to be smallar than the original amount
    Int getTotalBalance(restaurantID, tableID)

    //If the total balance is 0, means all paid, can close the balance
    Bool CloseBalance(restaurantID, tableID)


    //<<<<<<<USER BALANCE METHODS>>>>>>>>>>>>>>
    
    //Create user balance if one of the users in the table chooses an option other than pay the whole bill
    Bool createUserBalance(restaurantID, tableID, userID)

    //For the  pay what you are option, upon claim of item, add the item to the user balance 
    //It needs to check if the item is claimed by multiple users and update other users' balances accordingly
    Bool addtoUserBalance(restaurantID, tableID, userID, ItemID)

    //For the pay what you are option, upon disclaim of item, delete the item from the user balance 
    //It needs to check if the item is claimed by multiple users and update other users' balances accordingly
    Bool removefromUserBalance(restaurantID, tableID, userID, ItemID)

    //Checks user balance
    Int getUserBalance(restaurantID, tableID, userID)

    //If one of the users go back and chooses to pay the whole bill, calls this and destroys the user balance
    Bool deleteUserBalance(restaurantID, tableID, userID)

    //<<<<<<<<Payment methods>>>>>>>>>>>>>>>

    //Register a new payment method. This will probably call stripe
    bool createPaymentMethod(JSON credentials)

    //Updates selected payment method
    bool updatePaymentMethod(paymentID, JSON credentials)

    //Retrieve the registered Payment Methods of the user to be displayed on the payment options screen
    JSON getRegisteredPaymentMethods(userID?)

    //Deletes selected payment method
    deletePaymentMethod(paymentID)

    //Triggers the payment of the desired amount with the selected payment method. Calls payment external APIs.
    Boolean Pay(paymentID, userID, Int amount)


*/
