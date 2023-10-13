import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Dashboard must be within a UserProvider");
  }
  const { user } = context;

  return (
    <div>
      <h1>Welcome Back, {user ? user.name : "user is not defined"}</h1>
      <button onClick={() => navigate("/login")}>Log Out</button>
    </div>
  );
};

export default Dashboard;
