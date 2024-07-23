const express = require("express");
const router = express.Router();
const {
  protect,
  authorOnly,
} = require("../middleware/authMiddleware");
const {
  applyLoanUser,
  approveLoans,
  getLoans,
  loanEmpDeails,
  getEmployeeCardDetails,
 
} = require("../controllers/loanController");

router.post("/apply-loan",protect, applyLoanUser);

router.post("/update-loan",protect, approveLoans);
router.get("/getLoans", protect, getLoans);
router.get("/loanEmpDeails/:id", protect, loanEmpDeails);
router.get("/getEmployeeCardDetails",protect, getEmployeeCardDetails);




module.exports = router;
