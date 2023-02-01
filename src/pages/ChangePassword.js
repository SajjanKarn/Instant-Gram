import ToastContext from "context/ToastProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (credentials.newPassword !== credentials.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (credentials.password === credentials.newPassword) {
      toast.error("Please choose a different password than previous!");
      return;
    }

    try {
      const res = await fetch(
        `https://instant-gram-backend.onrender.com/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ ...credentials, confirmPassword: undefined }),
        }
      );
      const result = await res.json();
      if (!result.error) {
        toast.success("Password Changed");
        navigate("/profile", { replace: true });
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="change-password">
      <Link className="btn btn-danger" to="/profile">
        Go Back
      </Link>

      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="passwordInput" className="form-label mt-4">
            Current Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            placeholder="Current Password *"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPasswordInput" className="form-label mt-4">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="newPasswordInput"
            placeholder="New Password *"
            name="newPassword"
            value={credentials.newPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPasswordInput" className="form-label mt-4">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPasswordInput"
            placeholder="New Password *"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Change Password"
          className="btn btn-info my-3"
        />
      </form>
    </div>
  );
};

export default ChangePassword;
