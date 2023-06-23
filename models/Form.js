const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
        lowercase:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true
    },
    address:{
        type:String,
        require:true,
        lowercase:true
    },
    phone:{
        type:String,
        require:true,
        unique:true,
        lowercase:true
    },
    dob:{
        type:String,
        require:true,
        lowercase:true
    }
});

module.exports=mongoose.model('user',userSchema);