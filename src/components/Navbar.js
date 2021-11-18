import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import AuthContext from "context/AuthContext";
import ToastContext from "context/ToastProvider";

const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, setUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={user ? "/" : "/login"}>
          {title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/followingpost" && "active"
                    }`}
                    to="/followingpost"
                  >
                    Followings Post
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/search" && "active"
                    }`}
                    to="/search"
                  >
                    Search
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/create" && "active"
                    }`}
                    to="/create"
                  >
                    Create Post
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/profile" && "active"
                    }`}
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      localStorage.clear();
                      setUser(null);
                      toast.success("Logged out ");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "INSTANT-GRAM",
};

export default Navbar;
