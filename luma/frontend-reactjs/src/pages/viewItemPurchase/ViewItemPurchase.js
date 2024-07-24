import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "../../components/loader/Loader";
import Search from "../../components/search/Search";

import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { getCreditCardPurchases } from "../../redux/features/auth/authSlice";

import "./ViewItemPurchase.scss";

import "react-confirm-alert/src/react-confirm-alert.css";
import {
  FILTER_ITEM_PURCHASE,
  selectItemPurchage,
} from "../../redux/features/auth/filterSlice";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const ViewItemPurchase = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const { itemPurchages, isLoading } = useSelector(
    (state) => state.auth
  );
  const filteredUsers = useSelector(selectItemPurchage);

  useEffect(() => {
    dispatch(getCreditCardPurchases());
  }, [dispatch]);




  useEffect(() => {
    dispatch(FILTER_ITEM_PURCHASE({ itemPurchages, search }));
  }, [dispatch, itemPurchages, search]);

  // Begin Pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };

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
                <h3>Item Purchase</h3>
              </span>
              
              <span>
                <Search
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </span>
              
            </div>
           
         
            {/* Table */}
            {!isLoading && itemPurchages.length === 0 ? (
              <p>No data found...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Issue id</th>
                    <th>item description</th>
                    <th>item name</th>
                    <th>item category</th>
                    <th>item valuation</th>
                   <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((user, index) => {
                    const { _id,updatedAt, employee_id, item_description,item_category ,item_value} = user;
let purdate = updatedAt.split("T")[0]+" " +updatedAt.split("T")[1].split(".")[0]
 //var elapsed = date.getDate()+ " " +date.getMonth()
                    return (
                      <tr key={_id}>


                        <td> {_id}</td>
                        <td> {item_description}</td>
                          <td> {employee_id}</td>
                            <td> {item_category}</td>
                              <td> {item_value}</td>
                              <td>{purdate } </td>


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
