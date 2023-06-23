const mongoose=require('mongoose');
//yashrastogi2904 r0a3Wh5LtUXlycnW
module.exports=async()=>{
    const mongoUri='mongodb+srv://yashrastogi2904:r0a3Wh5LtUXlycnW@cluster0.mimwiu3.mongodb.net/';
    try{
        const connect=await mongoose.connect(mongoUri,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log("mongoDB connected ",connect.connection.host);
    }catch(e){
        console.log(e);
        process.exit(1);
    }
}