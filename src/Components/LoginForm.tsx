import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Logo from "./Logo";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("LoginForm must be used within a UserProvider");
  }
  const { setUser } = context;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.status === "error") {
        alert(data.error);
        return;
      }
      if (data.status === "success") {
        const user = {
          name: data.name,
          email: data.email,
          items: data.items,
        };
        setUser(user);
        alert("Login Successful");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <Logo />
        <input
          type="email"
          className="text-field"
          placeholder="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          className="text-field"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit" className="submit-button">
          Log In
        </button>
        <div className="register-message">
          <p>
            New User? <Link to="/register">Register Here</Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
