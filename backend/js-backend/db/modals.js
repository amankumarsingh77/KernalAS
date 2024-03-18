const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    subscription: {
        type: Boolean,
        required: false,
        default: null

    },
    subtype: {
        type: Object,
        required: false,
        default: null
    }
});


const Users = mongoose.model("Users", userSchema);

const subsschmea = mongoose.Schema({

    subduser: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    title: {
        type: String,
    },
    price: {
        type: Number
    }

}, {
    timestamps: true
})

const Subs = mongoose.model("Subs", subsschmea);



module.exports = { Users, Subs };