import Spinner from "components/Spinner";
import ToastContext from "context/ToastProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const ResetPassword = () => {
  const { id, token } = useParams();
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const checkLink = async () => {
    try {
      const res = await fetch(
        `https://instant-gram-backend.herokuapp.com/check-link`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: id, token }),
        }
      );
      const result = await res.json();
      if (!result.error) {
        setLoading(false);
        toast.success("Link Verified!");
      } else {
        setLoading(false);
        toast.error("Invalid Link!");
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setLoading(true);
    checkLink();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch(
        `https://instant-gram-backend.herokuapp.com/reset-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: id,
            token,
            password: credentials.password,
          }),
        }
      );
      const result = await res.json();

      if (!result.error) {
        toast.success(result.message);
        navigate("/login", { replace: true });
      } else {
        toast.error(result.error);

        if (res.status === 403) {
          toast.error(result.error);
          navigate("/login", { replace: true });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner splash="Verifying Link..." />
      ) : (
        <>
          <h3>Reset your password.</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="passwordInput" className="form-label mt-4">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="New Password *"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
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
                value={credentials.confirmPassword}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
            </div>
            <input
              type="submit"
              className="btn btn-info my-2"
              value="Change Password"
            />
          </form>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
