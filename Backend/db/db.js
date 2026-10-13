const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({

    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: function () {
            return !this.googleId;
        }
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
});

let User = mongoose.model("User", UserSchema);
module.exports = User;