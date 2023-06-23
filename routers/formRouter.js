const router=require('express').Router();
const formController=require('../controllers/formController');

router.post('/save',formController.saveFormData)
router.post('/update',formController.updateFormData)
router.get('/all',formController.getAllFormData);
router.post('/delete',formController.deleteFormData);

module.exports=router

