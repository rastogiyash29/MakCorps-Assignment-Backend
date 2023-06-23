const Form=require('../models/Form');
const {error,success}=require("../utils/responseWrapper");

const deleteFormData=async(req,res)=>{
    try {
        const {_id}=req.body;
        Form.findByIdAndDelete(_id)
        .then(deletedObject => {
            return res.send(success(202,"Form successfully deleted"));
        })
        .catch(err => {
            return res.send(error(404,`Form deletion failed ${err}`));
        });
    } catch (e) {
        return res.send(error(500,e));
    }
}

const updateFormData=async(req,res)=>{
    try {
        const {_id,name,email,address,phone,dob}=req.body;
        
        const olderForm=await Form.findOne({_id})
        if(olderForm){
            Form.findByIdAndUpdate(_id,{ $set: { name,email,address,phone,dob} }, { new: true }).then(updatedDocument => {
                return res.send(success(200,"Form Updated successfully"));
              })
              .catch(err => {
                return res.send(error(404,"Dupicate Email or Username, use unique"))
              });
        }else{
            return res.send(error(400,"Invalid Form updation"));
        }
    } catch (e) {
        return res.send(error(500,e))
    }
}

const saveFormData=async(req,res)=>{
    try {
        const {name,email,address,phone,dob}=req.body
        if(isEmptyOrUndefined(name)||isEmptyOrUndefined(address)||isEmptyOrUndefined(phone)
        ||!isValidDate(dob)||!isValidEmail(email)
        ||!isValidPhoneNumber(phone)){
            return res.send(error(400,"Invalid data"));
        }

        try {
            const form=await Form.create({
                name,
                email,
                address,
                phone,
                dob
            })   
            return res.send(success(201,form));
        } catch (err) {
            return res.send(error(400,"Email or Phone number already used"))
        }

    } catch (e) {
        return res.send(error(500,e));
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidDate(dateString) {
    const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
    if (!dateRegex.test(dateString)) {
      return false;
    }
  
    const [_, day, month, year] = dateString.match(dateRegex);
    const date = new Date(`${year}-${month}-${day}`);
    const isValid =
      date.getFullYear() == year &&
      date.getMonth() + 1 == month &&
      date.getDate() == day;
  
    return isValid;
}

function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
}

function isEmptyOrUndefined(str) {
    return str === undefined || str.length === 0;
}

const getAllFormData=async(req,res)=>{
    try {
        const allForms=await Form.find();
        return res.send(success(200,allForms));
    } catch (e) {
        return res.send(error(500,e));
    }
}

module.exports={
    saveFormData,
    getAllFormData,
    updateFormData,
    deleteFormData
}