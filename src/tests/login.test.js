import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import LoginPage from "../Pages/LoginPage";

describe("Login Page", () => {
  test("renders Login Page", () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: null, setUser: () => {} }}>
          <LoginPage />
        </UserContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByRole("form")).toBeInTheDocument();

    // Check that the email and password fields are rendered
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Check that the sign in button is rendered
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });
});
