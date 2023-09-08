const { check} = require("express-validator");
const validator = require("../../middlewares/ValidaterMiddleWare")
// const userModel = require("../../models/UserModel")

// exports.emailValidator = [
//     check("email")
//     .notEmpty()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("Please enter a valid email address")
//     .custom((val) =>
//     userModel.findOne({ email: val }).then((user) => {
//         if (user) {
//           return Promise.reject(new Error("E-mail already in use"));
//         }
//       })
//     ),
//     validator,
// ]