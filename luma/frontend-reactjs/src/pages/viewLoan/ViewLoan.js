import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/loader/Loader";
import Search from "../../components/search/Search";

import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { getLoans } from "../../redux/features/auth/authSlice";

import "./ViewLoan.scss";

import "react-confirm-alert/src/react-confirm-alert.css";
import {
  FILTER_LOANS,
  selectLoans,
} from "../../redux/features/auth/filterSlice";
import ReactPaginate from "react-paginate";
import {
  selectUser,approveLoans
} from "../../redux/features/auth/authSlice";

const ViewItemPurchase = () => {
  useRedirectLoggedOutUser("/login");
    const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const { loans, isLoading } = useSelector(
    (state) => state.auth
  );
  const filteredLoans = useSelector(selectLoans);
 
 

   const user = useSelector(selectUser);
 //const userId = user?._id;
const userRole = user?.role;
  //const [uidod, setUidod] = useState("pramod");
//setUidod("amit")
  //setuid(userId)
//console.log("uiduiduid uid  ",userId)
  useEffect(() => {
    dispatch(getLoans());
  }, [dispatch]);




  useEffect(() => {
    dispatch(FILTER_LOANS({ loans, search }));
  }, [dispatch, loans, search]);

  // Begin Pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
// console.log("filteredUsers>> ",filteredLoans)

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredLoans.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredLoans.length / itemsPerPage);
//console.log("currentItems pramdo ",currentItems)
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredLoans.length;
    setItemOffset(newOffset);
  };

  
    const approveLoan = async (e) => {
//console.log("eee ",e)

if (window.confirm("Are you want to approve?")) {
  dispatch(approveLoans({"loanID":e}));

   navigate("/view-item-purchase");
}

   
  
}

  // End Pagination

  return (
    <section>
      <div className="container">
        <button className="button"> <Link to="/dashboard">Dashboard</Link></button>   <button className="button"> <Link to="/view-loan">View Loan</Link></button> <button className="button"> <Link to="/loan-apply">Apply Loan</Link></button>   <button className="button"> <Link to="/view-item-purchase">View item Purchase</Link></button>
         
       

        <div className="user-list">
          {isLoading && <Spinner />}
          <div className="table">
            <div className="--flex-between">
              <span>
               <h2 className="--mt">All Employee Applied Loan List  </h2>
        
              </span>
              <span>
                <Search
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </span>
           </div>
             
            {/* Table  <Link to={`/view-item-purchase/${_id}`}>{employee_id}</Link> */}
            {!isLoading && loans.length === 0 ? (
              <p>No user found...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Employee id</th>
                    <th>item description</th>
                    <th>item name</th>
                    <th>item category</th>
                    <th>item valuation</th>
                    
                     <th>
                                   
            {userRole === 'admin' ? (
              <>Action</>)
                    :
             (
             <>Status</>)
                   }
                      
                     </th>
                     
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((user, index) => {
                   // console.log("user  ",)
                    const { _id, user_id,employee_id, item_category, item_description, item_make, item_value } = user;
//console.log("dddd>  user_id> ",user_id)
                    return (
                      <tr key={_id}>
                        <td> <Link to={`/view-item-emp-details/${user_id}`}>{employee_id}</Link></td>
                        <td> <Link to={`/view-item-emp-details/${user_id}`}>{item_category}</Link></td>
                         <td> <Link to={`/view-item-emp-details/${user_id}`}>{item_description}</Link></td>
                          <td> <Link to={`/view-item-emp-details/${user_id}`}>{item_make}</Link></td>
                           <td> <Link to={`/view-item-emp-details/${user_id}`}>{item_value}</Link></td>
                         
            {(userRole === 'admin' && user.status === 'pending')  ? 
( <td> <button onClick={()=>approveLoan(_id)} >Approve</button></td>)
:(userRole === 'admin' && user.status === 'approved') ? 
(<td>Appoved</td>)
:(userRole !== 'admin' && user.status === 'pending') ? 
(<td>Not Appove</td>)
:(<td> Appoved </td>)}
                  
                         
              
                         
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            <hr />
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="activePage"
          />
        </div>
      </div>
    </section>
  );
};

export default ViewItemPurchase;
