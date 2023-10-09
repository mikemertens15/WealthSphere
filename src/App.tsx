import "./App.css";
import Button from "./Components/Button";
import TextField from "./Components/TextField";
import Logo from "./Components/logo";

function App() {
  return (
    <>
      <div className="login-screen">
        <Logo />
        <TextField type="text" placeholder="email" />
        <TextField type="password" placeholder="Password" />
        <Button label="Log In" />
        <Button label="Register" />
      </div>
    </>
  );
}

export default App;
