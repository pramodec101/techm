const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const itemMasterSchema = mongoose.Schema(
  {
    user_id: {
    type: mongoose.Schema.Types.ObjectId,
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
    },
    status: {
      type: String,
      default: "pending",
      // subscriber, user, and admin
    },
   }, {
    timestamps: true,
    minimize: false,
  }
);

const ItemMaster = mongoose.model("ItemMaster", itemMasterSchema);
module.exports = ItemMaster;
