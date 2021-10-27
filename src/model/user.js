const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           required: true 
 *           unique: true
 *           index: true 
 *           description: email address of the registerd user
 *         password:
 *           type: string
 *           required: true 
 *           description: password of the registerd user hashed using bcrypt
 *         name:
 *           type: string
 *           required: true 
 *           description: name of the registerd user
 *         images:
 *           type: array
 *           items:
 *            type: string
 *           description: array of gallery ids saved by the registerd user
 *       example:
 *         _id: userID
 *         email: malith@email.com
 *         password: hasheduserpassword
 *         name: Malith Kuruppu
 *         images: [galleryID1, galleryID2, galleryID3]
 */

//mongoose model for user
const userSchema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  images: [{ type: String }],
});

module.exports = mongoose.model("User", userSchema);
