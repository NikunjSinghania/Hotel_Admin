const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    room_number : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    type_room :{
        type : String,
        required : true
    },
    start_time : {
        type : Date,
        required : true
    },
    end_time : {
        type : Date,
        required : true
    }    
})

const RoomBook = mongoose.model('RoomBook', roomSchema)

module.exports = RoomBook