const mongoose = require("mongoose");
// schema for rejected login tokens

const blacklistSchema = mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            ref: "User",
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("blacklist", blacklistSchema);