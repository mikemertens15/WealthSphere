import { useState } from "react";
import Logo from "./Logo";

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      if (response.status === 200) {
        alert(
          "Registration Successful, please log in with your new credentials!"
        );
        window.location.href = "/login";
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
