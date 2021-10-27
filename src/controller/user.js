const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");

require("dotenv/config");

const User = require("../model/user");

exports.createUser =  async (req, res) => {
    try {
    
      if (
        req.body.email === null ||
        req.body.password === null ||
        req.body.name == null
      )
        return res
          .status(422)
          .json({ message: "request body does not contain all user data" });
  
      //get the User doc containing the email: req.body.email
      const document = await User.findOne({ email: req.body.email });
  
      //if User found the the db forward 200 status to client
      if (document != null) {
        console.log("user/ post router SUCCESS - document found in DB");
  
        res.status(200).json({ message: "email already registered" });
      } else {
        //decrypt the password
        const passwordBytes = CryptoJS.AES.decrypt(
          req.body.password,
          process.env.PASSWORD_PASSPHRASE
        );
        const decryptPassword = passwordBytes.toString(CryptoJS.enc.Utf8);
  
        //hash the password using salt
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(decryptPassword, salt);
  
        const newDoc = new User({
          email: req.body.email,
          password: hashedPassword,
          name: req.body.name,
        });
        await newDoc.save();
        console.log("user/ post router success");
        res.status(201).json({ message: "saveDoc" });
      }
    } catch (error) {
      console.log("user/ post router failed!!!");
      res.status(500).json({ message: error });
    }
  }

  exports.updateUserImages =  async (req, res) => {
    const imageIDs = req.body.imageIDs;
  
    //check whether the length of req.body.imageIDs array in request is less than 9
    if (imageIDs.length > 9)
      return res
        .status(409)
        .json({ message: "user can only save atmost 9 images" });
  
    try {
         
     await User.findOneAndUpdate(
        { email: req.user.email },
        { $set: { images: imageIDs } }
      );
  
      console.log("user/images/:id patch router success");
  
      res.status(200).json({ message: "updated User Images" });
    } catch (error) {
      console.log("user/images/:id patch router failed!!!");
      res.json({ message: error });
    }
  }