const express = require("express");
const router = express.Router();

const AuthController = require('../controller/auth')
const GalleryController = require('../controller/gallery')

/**
 * @swagger
 * /gallery:
 *  get:
 *   summary: get all gallery doc in the db
 *   description: get all gallery doc in the db
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: gallery collection successfully fetched
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    500:
 *     description: Unexpected error
 */
//router for getting all image url from the db
router.get("/", AuthController.authenticateToken, GalleryController.getAllImages);


/**
 * @swagger
 * /gallery/images:
 *  get:
 *   summary: get all gallery doc matching the images array in the User collection in the db
 *   description: getting array of gallery id and url from the Gallery collection in the db as response. The gallery ids are taken from the images array in User doc in the db matching the accessToken in the header
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: gallery collection successfully fetched
 *    400:
 *     description: bad request
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    500:
 *     description: Unexpected error
 */
//router for getting gallery id and url from an array of gallery ids in the User.images from the Gallery collection in the db
router.get("/images", AuthController.authenticateToken, GalleryController.getImageById);

/**
 * @swagger
 * /gallery/{id}:
 *  patch:
 *   summary: updating url of a matching Gallery _id in the db
 *   description: updating url of a matching Gallery _id in the db
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: id of Gallery doc
 *      example: id
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties: 
 *        url:
 *          type: string
 *          required: true
 *          description: url of the updated image  
 *      example:
 *       url: www.someimageurl.com
 *   responses:
 *    200:
 *     description: gallery doc successfully updated
 *    400:
 *     description: bad request
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    500:
 *     description: Unexpected error
 */
//router for updating a url with a specific gallery id
router.patch("/:id", AuthController.authenticateToken, GalleryController.updateImageById);

module.exports = router;
