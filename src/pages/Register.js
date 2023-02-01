import Spinner from "components/Spinner";
import ToastContext from "context/ToastProvider";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [file, setFile] = useState();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  useEffect(() => {
    if (imageURL) {
      const registerCredentials = {
        ...credentials,
        profileImage: imageURL,
        confirmPassword: undefined,
      };

      fetch(`https://instant-gram-backend.onrender.com/signup`, {
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
            navigate("/login", { replace: true });
          } else {
            setLoading(false);
            toast.error(result.error);
          }
        });
    }
  }, [imageURL]);

  // form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!file.type.includes("image/")) {
      toast.error("File must be a image file!");
      return;
    }
    if (file.size > 8388608) {
      // bytes.
      toast.error("Image must be less than 8mb");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "instant-gram-clone");
    data.append("cloud_name", "dvhdpzlkq");

    fetch(`https://api.cloudinary.com/v1_1/dvhdpzlkq/image/upload`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.error) {
          setImageURL(result.secure_url);
        } else {
          toast.error("cannot upload photo at the moment");
        }
      })
      .catch((err) => console.log(err));

    setLoading(true);
  };

  return (
    <div>
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
            <div className="custom-file my-2">
              <label className="custom-file-label mx-2" htmlFor="photoInput">
                Choose Profile Image
              </label>
              <input
                type="file"
                className="custom-file-input btn btn-success"
                id="photoInput"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
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
