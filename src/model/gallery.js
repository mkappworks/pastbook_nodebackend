const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Gallery:
 *       type: object
 *       required:
 *         - url
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the gallery
 *         url:
 *           type: string
 *           required: true 
 *           description: url of the image
 *       example:
 *         _id: galleryID
 *         url: https://placeimg.com/2560/2560/any
 */

//mongoose model for gallery
const gallerySchema = new Schema({
  url: { type: String, required: true },
});

module.exports = mongoose.model("Gallery", gallerySchema);
