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


    const theQuery = 
        `SELECT My_Size, My_Rice, My_Protein, Side1, Side2, Side3 
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
 * @apiParam {String} rice the rice option of the order
 * @apiParam {String} protein the protein option of the order
 * @apiParam {Boolean} side1 the first option of the order
 * @apiParam {Boolean} side2 the second option of the order
 * @apiParam {Boolean} side3 the third option of the order
 * 
 * @apiParamExample {json} Request-Body-Example:
 *  {
 *      "size":"medium",
 *      "rice":"white",
 *      "protein":"chicken",
 *      "side1":true,
 *      "side2":false,
 *      "side3":true
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
    const rice = request.body.rice
    const protein = request.body.protein
    const side1 = request.body.side1
    const side2 = request.body.side2
    const side3 = request.body.side3

    const theQuery = 'INSERT INTO Orders(MemberID, My_Size, My_Rice, My_Protein, Option1, Option2, Option3) VALUES ($1, $2, $3, $4, $5, $6, $7)'
    let values = [memberid, size, rice, protein, side1, side2, side3]

    console.log('we are here!')

    if(isProvided(size) && isProvided(rice) && isProvided(protein)){

        if(isSize(size) && isRice(rice) && isProtein(protein) && isBoolean(side1) && isBoolean(side2) && isBoolean(side3)) {
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