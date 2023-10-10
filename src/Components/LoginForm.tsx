import { useState } from "react";

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
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
