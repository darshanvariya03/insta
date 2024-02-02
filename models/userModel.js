const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    des:{
        type : String,
        require : true
    },
    image:{
        type : String,
        require : true
    }
})

const user = mongoose.model('user',userSchema);
module.exports = user;