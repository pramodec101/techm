const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const ItemMaster = require("../models/itemMaster");
const bcrypt = require("bcryptjs");
var parser = require("ua-parser-js");
const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModel");
const Cryptr = require("cryptr");


const cryptr = new Cryptr(process.env.CRYPTR_KEY);







// Apply loan
const applyLoanUser = asyncHandler(async (req, res) => {
  //console.log("applyLoanUser applyLoanUser")

  const { user_id,employee_id, item_description, item_category,item_value,item_make } = req.body;

  // Validation
  if (!employee_id || !item_category || !item_value || !item_make) {
    res.status(400);
    throw new Error("Please fill in all the required fieldsd.");
  }

//console.log("user_id   ",user_id)

  //   Create new loan
  await ItemMaster.create({
   user_id,employee_id, item_description, item_category,item_value,item_make 
  },(err,data)=>{
   
if(data.employee_id){

    res.send(200)
  
  
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again");
  }


  });

 

});





const getEmployeeCardDetails = asyncHandler(async (req, res) => {
   const itemMasterLoan = await ItemMaster.find({status:"approved"});
  // console.log("itemMasterLoan ",itemMasterLoan)
  //const users = await Loan.find().sort("-createdAt").select("-employee_id");
  if (!itemMasterLoan) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.status(200).json(itemMasterLoan);
});


// Get Loans
const getLoans = asyncHandler(async (req, res) => {
   const loans = await ItemMaster.find();
   //console.log("loans   ",loans)
  //const users = await Loan.find().sort("-createdAt").select("-employee_id");
  if (!loans) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.status(200).json(loans);
});

// Get Login Status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }

  // Verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});



const approveLoans = asyncHandler(async (req, res) => {
  const loanID= req.body.loanID;

  const itemsmast = await ItemMaster.findById(loanID);
//console.log("req.itemsmast >> ????????? ",itemsmast)
  if (!itemsmast) {
    res.status(404);
    throw new Error("User not found");
  }

  itemsmast.status = "approved";
  await itemsmast.save();

  res.status(200).json({
    message: `employe loan appoved`,
  });
});
// Delete User
const loanEmpDeails = asyncHandler(async (req, res) => {
  let loansdeatis = await ItemMaster.find({ user_id: req.params.id });
  //const loansdeatis = ItemMaster.find({_id:req.params.id});
console.log("pramod.id>>> ",req.params.id)
//console.log("req.params.id ",loansdeatis)
  if (!loansdeatis) {
    res.status(404);
    throw new Error("loan not found");
  }

   res.status(200).json(loansdeatis);

});

module.exports = {
  applyLoanUser,
  getLoans,
  getEmployeeCardDetails,
  approveLoans,
  loanEmpDeails
};
