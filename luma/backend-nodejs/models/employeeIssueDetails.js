const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const employeeIssueDetailsSchema = mongoose.Schema(
  {
    issue_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
    employee_id: {
      type: String
    },
   item_id: {
      type: String
    },
    issue_date: {
      type: Date
    },
    return_date: {
      type: Date
    },
   
   }, {
    timestamps: true,
    minimize: false,
  }
);

const EmployeeIssueDetails = mongoose.model("EmployeeIssueDetails", employeeIssueDetailsSchema);
module.exports = EmployeeIssueDetails;
