import Spinner from "components/Spinner";
import ToastContext from "context/ToastProvider";
import { createRef, useContext, useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useContext(ToastContext);

  const emailRef = createRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emailRef.current.value) {
      toast.error("Please enter email to proceed.");
      return;
    }
    setLoading(true);
    const res = await fetch(
      `https://instant-gram-backend.onrender.com/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailRef.current.value }),
      }
    );
    const result = await res.json();
    if (!result.error) {
      toast.success(result.message);
      setLoading(false);
    } else {
      toast.error(result.error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Link to="/login" className="btn btn-danger my-3">
        Go Back
      </Link>
      {loading ? (
        <Spinner splash="Sending Reset Password Link ..." />
      ) : (
        <>
          <h3>Have you forgot your password ?</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="emailInput" className="form-label mt-4">
                Your Email
              </label>
              <input
                type="email"
                className="form-control"
                ref={emailRef}
                id="emailInput"
                placeholder="Enter Your Email"
                required
              />
              <input
                type="submit"
                className="btn btn-info my-2"
                value="Send Reset Link"
              />
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
