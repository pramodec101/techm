const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const employeeCardDetailsSchema = mongoose.Schema(
  {
    user_id: {
    type: mongoose.Schema.Types.ObjectId
  },
    employee_id: {
      type: String
    },
   item_description: {
      type: String
    },
    item_category: {
      type: String
    },
    item_value: {
      type: String
    },
    item_make: {
      type: String
    }
   }, {
    timestamps: true,
    minimize: false,
  }
);

const EmployeeCardDetails = mongoose.model("EmployeeCardDetails", employeeCardDetailsSchema);
module.exports = EmployeeCardDetails;
