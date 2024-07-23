/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
 RESET, applyloanUser
} from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import "./LoanApply.scss";
import { Link } from "react-router-dom";
import {
  selectUser,
} from "../../redux/features/auth/authSlice";



const LoanApply = () => {

   const user = useSelector(selectUser);

  const userId = user?._id;
//console.log("userId ",userId)
  
  const initialState = {
  employee_id: "",
  item_description: "",
  item_category: "",
  item_value: "",
  item_make: ""

    };
  
 const [formData, setFormData] = useState(initialState);
formData.user_id=userId;
  const { employee_id,item_description,item_category,item_value,item_make } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({ ...formData, [name]: value});
    //console.log("formData  on change ",formData)
  };



 const onSubmitForm = async (e) => {



    if (!employee_id) {
      return toast.error("Employee Id fields are required");
    }
   if (!item_category) {
      return toast.error("Item category fields are required");
    }
    if (!item_value) {
      return toast.error("Item value fields are required");
    }
    if (!item_make) {
      return toast.error("Item make fields are required");
    }
    //console.log("formDataformDataformData  ",formData)

    await dispatch(applyloanUser(formData));
    navigate("/view-loan");

   
  };

  

  return (
    <div className="container auth_form__apply_loan auth_auth__FbDYI">
      
    
        
      {isLoading && <Loader />}
      <div className="aply-ln">
          
      <Card>
         <button className="button"> <Link to="/dashboard">Dashboard</Link></button>   <button className="button"> <Link to="/view-loan">View Loan</Link></button>   <button className="button"> <Link to="/view-item-purchase">View item Purchase</Link></button>
      
          <h2>  Apply Loan</h2>

        
            <input
              type="text" required className="loan-input-form" 
              placeholder="Employee id"
              
              name="employee_id"
              onChange={handleInputChange}
            />
            <input
              type="text" className="loan-input-form" 
              placeholder="Item description"
              
              name="item_description"
              onChange={handleInputChange}
            />
            <select name="item_category" className="loan-input-form"    onChange={handleInputChange} className="">
              <option value="">-- Select Item Category -- </option>
              <option value="furniture">Furniture</option>
              <option value="mobile">Mobile</option>
              <option value="laptop">Laptop</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
            <input
              type="text"
              placeholder="Item value"
              className="loan-input-form" 
              name="item_value"
              onChange={handleInputChange}
            />
<select name="item_make"  className="loan-input-form"   onChange={handleInputChange} className="">
                <option value="">-- Select Item Make -- </option>
              <option value="wodden">Wodden</option>
              <option value="fiber">Fiber</option>
              <option value="electronics">Electronics</option>
              <option value="iron">Iron</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
         <p></p><p></p>
         <br></br>
            <button onClick={()=>onSubmitForm()}  className="--btn --btn-primary --btn-block">
              Apply Loan
            </button>
         

       
      </Card>
       </div>
    </div>
  );
};


export default LoanApply;
