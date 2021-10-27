const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const GalleryController = require ('../controller/gallery')

const User = require('../model/user')

let userTokens = [];

//Login Controller: generate access and refresh token and sends the data in response
exports.login = async (req, res) => {
  try {
    //check whether user in DB. If not found forward a 400 status to the client
    const user = await User.findOne({ email: req.body.email });
    if (user == null)
      return res.status(400).json({ message: "Cannot find user" });

    //decrypt the password against the PASSWORD_PASSPHRASE in the .env
    const passwordBytes = CryptoJS.AES.decrypt(
      req.body.password,
      process.env.PASSWORD_PASSPHRASE
    );

    const decryptPassword = passwordBytes.toString(CryptoJS.enc.Utf8);

    //Authenticate User
    if (await bcrypt.compare(decryptPassword, user.password)) {
      const userDetails = {
        email: user.email,
        password: user.password,
      };
      const accessToken = generateAccessToken(userDetails);
      const refreshToken = generateRefreshAccessToken(userDetails);

      //Pushed to a refreshToken array in the auth.js file
      userTokens.push(refreshToken);

      //get the sorted gallery objects with id and url
      const sortImageIDUrlList = await GalleryController.getSortedImages(user.images);

      console.log("auth/ post router success");

      res.status(200).json({
        userID: user._id,
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: "900",
        userImages: sortImageIDUrlList,
      });
    } else {
      console.log("auth/ post router failed");
      res.status(401).json({ message: "Password Incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

//function to res the new access token from the req of rehreshToken
exports.updateAccessToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  //check whether refreshToken is in the request, if not send a 401 status to the client
  if (refreshToken == null) return res.sendStatus(401);
  //check whether the token is available in the refreshToken array, if not send a 403 status to the client
  if (!userTokens.includes(refreshToken)) return res.sendStatus(403);

  //check the refreshToken against the REFRESH_TOKEN_SECRET in the .env
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json({ message: error });
    const userDetails = {
      email: user.email,
      password: user.password,
    };
    
    //if valid rehreshToken then generate and forward a new accessToken to the client
    const accessToken = generateAccessToken(userDetails);
    res.status(200).json({ accessToken: accessToken, expiresIn: "900" });
  });
}

//function to delete the refresh token from the array
exports.deleteToken = (req, res) => {
  userTokens = userTokens.filter((token) => token !== req.body.refreshToken);
  res.sendStatus(204);
}

//authenticateToken Middleware
exports.authenticateToken = (req, res, next) => {
  //get the token from the authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  //if no token is available in the request a 401 status forwarded to the client
  if (token == null) return res.sendStatus(401);

  //verify the token with the ACCESS_TOKEN_SECRET in .env
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

//function to generate a access token
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "900s",
  });
};

//function to generate a refresh token
const generateRefreshAccessToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};
