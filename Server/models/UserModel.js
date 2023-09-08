const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     email:{
      type: String,
      required: [true, "email required"],
      unique: true,
    },
    phone:{
      type : String,
      required: true,
    },
    transactionTitle : {
        type: String,
        required: [true, "transaction title required"],
    },
    instagramLink:{
      type: String,
      required: true,
    },
    price: {
      type : Number,
      required : true,
    },
    itemDescription:{
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "manager", "admin"],
      default: "user",
    },

},{timestamps: true}
)

module.exports = mongoose.model("userChat", userSchema);