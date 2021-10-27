const express = require("express");
const router = express.Router();

require("dotenv/config");

const AuthController = require ('../controller/auth')

/**
 * @swagger
 * components:
 *   securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *   responses:
 *    UnauthorizedError:
 *      description: Access token is missing or invalid
 */

/**
 * @swagger
 * /auth:
 *  post:
 *   summary: login user
 *   description: forward generated accessToken, refreshToken, expireIn and User images
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *          type: string
 *          required: true
 *          description: email of the user
 *        password:
 *          type: string
 *          required: true
 *          description: password of the user
 *      example:
 *       email: malith@user.com
 *       password: userpassword
 *   responses:
 *    200:
 *     description: login successful
 *    400:
 *     description: bad request
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    500:
 *     description: Unexpected error
 */
//router to create a access and refresh token when a user logs in
router.post("/", AuthController.login);

/**
 * @swagger
 * /auth:
 *  patch:
 *   summary: update accessToken and expireIn
 *   description: verify refreshToken in request body and generate and forward new accessToken and expireIn as response body
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        refreshToken:
 *          type: string
 *          required: true
 *          description: refreshToken of the user session created in post /auth
 *      example:
 *       refreshToken: jwtrefreshToken
 *   responses:
 *    200:
 *     description: update successful
 *    400:
 *     description: bad request
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    403:
 *     description: refresh token does not have the required scope
 *    500:
 *     description: Unexpected error
 */
//router to get new token (refresh token) after the last token has expired
router.patch("/", AuthController.updateAccessToken);

/**
 * @swagger
 * /auth:
 *  delete:
 *   summary: logout user
 *   description: delete refreshToken from the userTokens array
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        rehreshToken:
 *          type: string
 *          required: true
 *          description: refreshToken of the user session created in post /auth
 *      example:
 *       refreshToken: jwtrefreshToken
 *   responses:
 *    204:
 *     description: logout successful
 */
//router to remove the token from the userTokens array
router.delete("/", AuthController.deleteToken );

module.exports = router;
