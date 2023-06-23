const router=require('express').Router();
const formRouter=require('./formRouter');

router.use('/form',formRouter);

module.exports=router