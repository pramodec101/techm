import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "../../components/loader/Loader";
import Search from "../../components/search/Search";

import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { getDetailLoans } from "../../redux/features/auth/authSlice";

import "./ViewPurchaseEmpDeatils.scss";

import "react-confirm-alert/src/react-confirm-alert.css";
import {
  FILTER_LOANS_DETAILS,
  selectDeatilsLoans,
} from "../../redux/features/auth/filterSlice";
import ReactPaginate from "react-paginate";

import { Link } from "react-router-dom";
const ViewPurchaseEmpDeatils = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const { loans, isLoading } = useSelector(
    (state) => state.auth
  );
  const filteredItemPurchage = useSelector(selectDeatilsLoans);
 
 

 //  const user = useSelector(getDetailLoans);
 //const id = user?._id;

  //const [uidod, setUidod] = useState("pramod");
//setUidod("amit")
  //setuid(userId)
//console.log("uiduiduid uid pramdo  ",id)
  useEffect(() => {
    dispatch(getDetailLoans());
  }, [dispatch]);




  useEffect(() => {
    dispatch(FILTER_LOANS_DETAILS({ loans, search }));
  }, [dispatch, loans, search]);

  // Begin Pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
 console.log("filteredUsers>>> ",filteredItemPurchage)

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredItemPurchage.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredItemPurchage.length / itemsPerPage);
//console.log("currentItems pramdo ",currentItems)
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredItemPurchage.length;
    setItemOffset(newOffset);
  };

  // End Pagination

  return (
    <section>
      <div className="container">
    
        <button className="button"> <Link to="/dashboard">Dashboard</Link></button>   <button className="button"> <Link to="/view-loan">View Loan</Link></button> <button className="button"> <Link to="/loan-apply">Apply Loan</Link></button>   <button className="button"> <Link to="/view-item-purchase">View item Purchase</Link></button>

        <div className="user-list">
          <span>
               <h2 className="--mt">Item ........ Purchase of Particular Employee Details</h2>
       
              </span>

               <div className="table">
            <div className="--flex-between">
            <table>
                <thead>
                  <tr>
                    <th>Employee id :<span className="empd1">pg008107674 ..</span></th>
                    <th>Designation :<span className="empd1">Manager</span></th>
                    <th>Department: <span className="empd1">Credit Card</span></th>
                  </tr>
                 </thead>
                  </table>

              </div>
              </div>
         
          {isLoading && <Spinner />}
          <div className="table">
            <div className="--flex-between">
              
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
                    <th>Loan id </th>
                    <th>Loan Type</th>
                    <th>Duration</th>
                    <th>Card Issue Date</th>
                 
                  
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((user, index) => {
                    const { _id, employee_id, item_category, item_description, item_make } = user;

                    return (
                      <tr key={_id}>
                        <td>{employee_id}</td>
                        <td>{item_category}</td>
                        <td>{item_description}</td>
                        <td>{item_make}</td>
                    
                         
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

export default ViewPurchaseEmpDeatils;
