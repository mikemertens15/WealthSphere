import { useState } from "react";
import Logo from "./Logo";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      if (data.user) {
        localStorage.setItem("token", data.user);
        alert("Login Successful");
        // window.location.href = '/dashboard
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
    </form>
  );
};

export default LoginForm;
