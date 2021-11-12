import Spinner from "components/Spinner";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    const registerCredentials = { ...credentials, confirmPassword: undefined };

    fetch(`http://localhost:8000/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerCredentials),
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.error) {
          setLoading(false);
          toast.success("Register Success.");
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 3000);
        } else {
          setLoading(false);
          toast.error(result.error);
        }
      });
  };

  return (
    <div>
      <ToastContainer autoClose={2500} />
      {loading ? (
        <Spinner splash="Wait a few sec.. We are registering your account...." />
      ) : (
        <>
          <h3>Register </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nameInput" className="form-label mt-4">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                placeholder="John Doe"
                name="name"
                value={credentials.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailInput" className="form-label mt-4">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                aria-describedby="emailHelp"
                placeholder="johndoe123@gmail.com"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
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
                id="passwordInput"
                placeholder="Enter Password *"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label mt-4">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm Password *"
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <input
              type="submit"
              value="Register"
              className="btn btn-success my-3"
            />

            <p>
              Already have an account ? <Link to="/login">Login</Link>
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
