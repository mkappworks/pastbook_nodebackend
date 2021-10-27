const express = require("express");
const router = express.Router();

const AuthController = require('../controller/auth')
const UserController = require('../controller/user')

/**
 * @swagger
 * /user:
 *  post:
 *   summary: create user
 *   description: create user and store in db
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/User'
 *      example:
 *       email: malith@user.com
 *       password: userpassword
 *       name: Malith Kuruppu
 *   responses:
 *    200:
 *     description: email already registered
 *    201:
 *     description: user successfully created
 *    400:
 *     description: bad request 
 *    422:
 *     description: request body does not contain all user data
 *    500:
 *     description: Unexpected error
 */
//router for adding a new user to the db
router.post("/", UserController.createUser);

/**
 * @swagger
 * /user/images:
 *  patch:
 *   summary: update the images array
 *   security:
 *     - bearerAuth: [] 
 *   description: find user matching the email in the request body and save the images array from request body in User doc in the db
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *        type: object
 *        properties:
 *          imageIDs:
 *           type: array
 *           items:
 *            type: string
 *           description: array of gallery ids
 *        example:
 *          imageIDs: [galleryID1, galleryID2, galleryID3]
 *   responses:
 *    200:
 *     description: imageIDs successfully updated by user email in the db
 *    400:
 *     description: bad request
 *    401:
 *     $ref: '#/components/responses/UnauthorizedError'
 *    403:
 *     description: access token does not have the required scope
 *    409:
 *     description: length of the imageIDs array cannot be greater than 9
 *    500:
 *     description: Unexpected error
 */
//router for updating a images array for a given user with a specific id
router.patch("/images", AuthController.authenticateToken, UserController.updateUserImages);

//router for updating a  user email, password , name with a specific id
// router.patch("/:id", authenticateToken, async (req, res) => {
//   try {
//     await User.findByIdAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: {
//           email: req.body.email,
//           password: req.body.password,
//           name: req.body.name,
//         },
//       }
//     );

//     console.log("user/:id patch router success");

//     res.status(200).json({ message: "updated User Details" });
//   } catch (error) {
//     console.log("user/:id patch router failed!!!");
//     res.json({ message: error });
//   }
// });

//router for deleting a user with a specific id
// router.delete("/:id", authenticateToken, async (req, res) => {
//   try {
//     await User.findByIdAndDelete({
//       _id: req.params.id,
//     });
//     console.log("user/:id delete router success");
//     res.status(200).json({ message: "deletedUser" });
//   } catch (error) {
//     console.log("user/:id delete router failed!!!");
//     res.json({ message: error });
//   }
// });

module.exports = router;
