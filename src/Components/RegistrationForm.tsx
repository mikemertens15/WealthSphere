import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { UserContext } from "../Context/UserContext";

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.confirmPassword !== formData.password) {
      alert("Passwords do not match! Please try again");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/register", {
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
      if (data) {
        const user = {
          name: data.name,
          email: data.email,
          items: data.items,
        };
        setUser(user);
        alert("Registration Successful, Welcome!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Logo />
      <input
        type="text"
        className="text-field"
        placeholder="Your name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
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
      <input
        type="password"
        className="text-field"
        placeholder="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />
      <button type="submit" className="submit-button">
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
