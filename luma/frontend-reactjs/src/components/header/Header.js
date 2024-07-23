import React from "react";
import "./Header.scss";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, RESET } from "../../redux/features/auth/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../protect/hiddenLink";
import { UserName,UserRole } from "../../pages/dashboard/Dashboard";

const activeLink = ({ isActive }) => (isActive ? "active" : "");

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  return (<>
    <header className="header">
      <nav>
        <div className="logo" >
        
          <span>LUMA</span>
          <ShowOnLogin>
          
       
              <UserRole />
            
          </ShowOnLogin>
          <ShowOnLogout></ShowOnLogout>
         
        </div>

        <ul className="home-links">
          <ShowOnLogin>
            <li className="--flex-center">
              <FaUserCircle size={20} />
              <UserName />
          
            </li>
          </ShowOnLogin>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <NavLink to="/dashboard" className={activeLink}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" className={activeLink}>
                User List
              </NavLink>
            </li>
            <li>
              <button onClick={logoutUser} className="--btn --btn-secondary">
                Logout
              </button>
            </li>
          </ShowOnLogin>
        </ul>
        
      </nav>
      
    </header>

    
    </>
  );
};

export default Header;
