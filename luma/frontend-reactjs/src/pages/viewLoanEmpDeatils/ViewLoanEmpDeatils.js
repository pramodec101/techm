import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "../../components/loader/Loader";
import Search from "../../components/search/Search";

import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { getLoans_d } from "../../redux/features/auth/authSlice";

import "./ViewLoanEmpDeatils.scss";

import "react-confirm-alert/src/react-confirm-alert.css";
import {
  FILTER_LOANS_D,
  selectLoans_d,
} from "../../redux/features/auth/filterSlice";
import ReactPaginate from "react-paginate";

import { UserDesignation,UserDepartment,UserEmpID } from "../../pages/dashboard/Dashboard";
import { Link } from "react-router-dom";
const ViewLoanEmpDeatils = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const { loans_d, isLoading } = useSelector(
    (state) => state.auth
  );
  const filteredLoans_d = useSelector(selectLoans_d);
 
 

   //const user = useSelector(selectUser);


  //const [uidod, setUidod] = useState("pramod");
//setUidod("amit")
  //setuid(userId)
//console.log("uiduiduid uid >>>>  ",userId)
  useEffect(() => {
    dispatch(getLoans_d());
  }, [dispatch]);




  useEffect(() => {
    dispatch(FILTER_LOANS_D({ loans_d, search }));
  }, [dispatch, loans_d, search]);

  // Begin Pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
 //console.log("filteredUsers ",filteredLoans)

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredLoans_d.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredLoans_d.length / itemsPerPage);
//console.log("currentItems pramdo ",currentItems)
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredLoans_d.length;
    setItemOffset(newOffset);
  };

  // End Pagination

  return (
    <section>
      <div className="container">
    
         <button className="button"> <Link to="/dashboard">Dashboard</Link></button>   <button className="button"> <Link to="/view-loan">View Loan</Link></button> <button className="button"> <Link to="/loan-apply">Apply Loan</Link></button>   <button className="button"> <Link to="/view-item-purchase">View item Purchase</Link></button>

        <div className="user-list">
          <span>
               <h2 className="--mt">Loan Cards Purchase List</h2>
       
              </span>

               <div className="table">
            <div className="--flex-between">
            <table>
                <thead>
                  <tr>
                    <th>Employee id :<span className="empd1"><UserEmpID /></span></th>
                    <th>Designation :<span className="empd1"><UserDesignation /></span></th>
                    <th>Department: <span className="empd1"><UserDepartment /></span></th>
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
            {!isLoading && loans_d.length === 0 ? (
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
                    const { _id, item_category, item_description, item_make } = user;

                    return (
                      <tr key={_id}>
                        <td>{_id}</td>
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

export default ViewLoanEmpDeatils;
