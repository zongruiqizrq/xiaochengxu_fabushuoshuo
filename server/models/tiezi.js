const mongoose = require("mongoose");

module.exports = mongoose.model("tiezi",{
    nickName : String,
    avatarUrl : String,
    fwqPics : [String],
    content: String,
    time : Date,
})