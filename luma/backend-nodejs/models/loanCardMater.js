const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const loanCardMasterSchema = mongoose.Schema(
  {
    user_id: {
    type: mongoose.Schema.Types.ObjectId
  },
    loan_type: {
      type: String
    },
   duration_in_year: {
      type: String
    },
    
   }, {
    timestamps: true,
    minimize: false,
  }
);

const LoanCardMaster = mongoose.model("LoanCardMaster", loanCardMasterSchema);
module.exports = LoanCardMaster;
