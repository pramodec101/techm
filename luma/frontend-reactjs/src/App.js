import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import ViewLoan from "./pages/viewLoan/ViewLoan";
import LoanApply from "./pages/loanApply/LoanApply";
import ViewItemPurchase from "./pages/viewItemPurchase/ViewItemPurchase";
import ViewLoanEmpDeatils from "./pages/viewLoanEmpDeatils/ViewLoanEmpDeatils";
import ViewPurchaseEmpDeatils from "./pages/viewPurchaseEmpDeatils/ViewPurchaseEmpDeatils";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserList from "./pages/userList/UserList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
       
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
           
          
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
             <Route
              path="/loan-apply"
              element={
                <Layout>
                  <LoanApply />
                </Layout>
              }
            /> <Route
              path="/view-loan"
              element={
                <Layout>
                  <ViewLoan />
                </Layout>
              }
            /> 
     
            <Route
              path="/view-item-purchase/"
              element={
                <Layout>
                  <ViewItemPurchase />
                </Layout>
              }
            />
            <Route
              path="/view-item-emp-details/:id"
              element={
                <Layout>
                  <ViewLoanEmpDeatils />
                </Layout>
              }
            />
             <Route
              path="/view-purchase-emp-details/:id"
              element={
                <Layout>
                  <ViewPurchaseEmpDeatils />
                </Layout>
              }
            />
           <Route
              path="/users"
              element={
                <Layout>
                  <UserList />
                </Layout>
              }
            />
          </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App;
