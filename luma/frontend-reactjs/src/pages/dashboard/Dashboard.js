import "./Dashboard.scss";
import InfoBox from "../../components/infoBox/InfoBox";
import {NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import {
  selectUser,
} from "../../redux/features/auth/authSlice";

const Dashboard = () => {
   useRedirectLoggedOutUser("/login");
  const activeLink = ({ isActive }) => (isActive ? "active" : "");

  return (
    <div className="user-summary">
      <h2 className="--mt">Loan Management Application</h2>
         <h4 className="--mt">User Dashboard</h4>
      <div className="info-summary">
     
      <NavLink to="/view-loan" className={activeLink}>
        <InfoBox
          title={"View Loan"}
          bgColor="card1"
        />
        </NavLink>
           <NavLink to="/loan-apply" className={activeLink}>
        <InfoBox
          title={"Apply for loan"}
          bgColor="card2"
        />
         </NavLink>
           <NavLink to="/view-item-purchase" className={activeLink}>
        <InfoBox
          title={"View Item Purchased"}
          bgColor="card3"
        />
        </NavLink>
      </div>
    </div>
  );
};
export const UserName = () => {
  const user = useSelector(selectUser);
//console.log("user ",user)
  const username = user?.name || "...";

  return <p className="--color-white">Hi, {shortenText(username, 9)} |</p>;
};
export const UserRole = () => {
  const role = useSelector(selectUser);
//console.log("role ",role)
  const userrole = role?.role || "...";

  return <p className="userrole"> <b> ({userrole})</b></p>;
};
export const UserDesignation = () => {
  const designations = useSelector(selectUser);
  const udesignation = designations?.designation || "...";
  return <>{udesignation}</>;
};
export const UserDepartment = () => {
  const departments = useSelector(selectUser);
  const udepartment = departments?.department || "...";
  return <>{udepartment}</>;
};

export const UserEmpID = () => {
  const empID = useSelector(selectUser);
  //console.log("empID  ",empID)
  const uempID = empID?._id || "...";
  return <>{uempID}</>;
};
export const shortenText = (text, n) => {
  if (text.length > n) {
    const shoretenedText = text.substring(0, n).concat("...");
    return shoretenedText;
  }
  return text;
};
export default Dashboard;
