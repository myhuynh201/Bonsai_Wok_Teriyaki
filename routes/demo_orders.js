//express is the framework we're going to use to handle requests
const express = require('express')

const router = express.Router()

 
const pool = require('../utilities/exports').pool

const isProvided = require('../utilities/exports').helpers.isProvided
const isSize = require('../utilities/exports').helpers.isSize
const isColor = require('../utilities/exports').helpers.isColor
const isBoolean = require('../utilities/exports').helpers.isBoolean

/**
 * @apiDefine JSONError
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 */ 

/**
 * @api {get} /orders Request to get all Order entries in the DB
 * @apiName GetOrders
 * @apiGroup Orders
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/orders
 * 
 * @apiSuccess {Object[]} orders List of Orders in the database
 * 
 * @apiError (404: No Orders Found) {String} message "No Orders"
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 * @apiUse JSONError
 */ 
router.get("/", (request, response) => {

    // const theQuery = 
    //     `SELECT My_Size, My_Color, Option1, Option2, Option3 
    //      FROM Orders`

    const theQuery = 
        `SELECT My_Size, My_Color, Option1, Option2, Option3 
         FROM Orders
         WHERE MemberID=$1`
    let values = [request.decoded.memberid]

    // const theQuery = 
    //     `SELECT * 
    //      FROM Orders`

    pool.query(theQuery, values)
        .then(result => {
            if (result.rowCount > 0) {
                response.send({
                    orders: result.rows
                })
            } else {
                response.status(404).send({
                    message: "No Orders"
                })
            }
        })
        .catch(err => {
            //log the error
            // console.log(err.details)
            response.status(400).send({
                message: err.detail
            })
        })
})
/**
 * @api {post} /orders Request to add an order to the DB
 * @apiName PostOrders
 * @apiGroup Orders
 * 
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParam {String} size the size of the order
 * @apiParam {String} color the color of the order
 * @apiParam {Boolean} option1 the first option of the order
 * @apiParam {Boolean} option2 the second option of the order
 * @apiParam {Boolean} option3 the third option of the order
 * 
 * @apiParamExample {json} Request-Body-Example:
 *  {
 *      "size":"medium",
 *      "color":"green",
 *      "option1":true,
 *      "option2":false,
 *      "option3":true
 *  }
 * 
 * @apiSuccess (Success 201) {boolean} success true when the order is inserted
 * @apiSuccess (Success 201) {String} message "Inserted order"
 * 
 * @apiError (400: Missing Parameters) {String} message "Missing required information"
 * @apiError (400: Invalid Parameters) {String} message "Invalid parameters"
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 */ 
router.post("/", (request, response) => {
    const memberid = request.decoded.memberid
    const size = request.body.size
    const color = request.body.color
    const option1 = request.body.option1
    const option2 = request.body.option2
    const option3 = request.body.option3

    const theQuery = 'INSERT INTO Orders(MemberID, My_Size, My_Color, Option1, Option2, Option3) VALUES ($1, $2, $3, $4, $5, $6)'
    let values = [memberid, size, color, option1, option2, option3]

    if(isProvided(size) && isProvided(color)){

        if(isSize(size) && isColor(color) && isBoolean(option1) && isBoolean(option2) && isBoolean(option3)) {
            pool.query(theQuery, values)
                .then(result => {
                    //We successfully added the order!
                    response.status(201).send({
                        success: true,
                        message: "Inserted order"
                    })
                })
                .catch(err => {
                    //log the error
                    console.log(err)
                    response.status(400).send({
                        message: err.detail
                    })
                })
        } else {
            
            response.status(400).send({
                message: "Invalid parameters"
            })
        }
    } else {
        response.status(400).send({
            message: "Missing required information"
        })
    }
})



module.exports = router