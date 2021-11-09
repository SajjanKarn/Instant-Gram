import { createRef } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const emailRef = createRef();
  const passwordRef = createRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(emailRef.current.value, passwordRef.current.value);
  };

  return (
    <div className="login-page">
      <h3>Login </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="emailInput" className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            ref={emailRef}
            id="emailInput"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            ref={passwordRef}
            id="passwordInput"
            placeholder="Enter Password"
            required
          />
        </div>
        <input type="submit" value="Login" className="btn btn-primary my-3" />

        <p>
          Don't have an account ? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
