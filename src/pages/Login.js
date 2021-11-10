import { createRef } from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const emailRef = createRef();
  const passwordRef = createRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8000/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.error) {
          toast.success("Logged In");
        } else {
          toast.error(result.error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-page">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
