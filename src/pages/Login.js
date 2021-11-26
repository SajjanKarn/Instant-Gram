import AuthContext from "context/AuthContext";
import ToastContext from "context/ToastProvider";
import { createRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();

  const emailRef = createRef();
  const passwordRef = createRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://instant-gram-backend.herokuapp.com/signin`, {
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
          localStorage.setItem("token", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));
          toast.success("Logged In");
          setUser(result.user);
          navigate("/", { replace: true });
        } else {
          toast.error(result.error);
        }
      })
      .catch((err) => console.log(err));
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
        <p>
          Unable to login ? <Link to="/forgot-password">Forgot Password</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
