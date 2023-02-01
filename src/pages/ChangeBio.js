import Spinner from "components/Spinner";
import ToastContext from "context/ToastProvider";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ChangeBio = () => {
  const navigate = useNavigate();
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useContext(ToastContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!bio) {
      toast.error("Please enter bio!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://instant-gram-backend.onrender.com/updatebio`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ bio }),
        }
      );
      const result = await res.json();

      if (!result.error) {
        toast.success(result.message);
        setLoading(false);

        setTimeout(() => {
          navigate("/profile", { replace: true });
          window.location.reload(true);
        }, 1500);
      } else {
        toast.error(result.error);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bioupdate-page">
      <Link to="/profile" className="btn btn-danger ">
        Go Back
      </Link>

      {loading ? (
        <Spinner splash="Updating Bio..." />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="bioInput" className="form-label mt-4">
              Add You Bio
            </label>
            <textarea
              rows={6}
              className="form-control"
              id="bioInput"
              placeholder="Enter Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={300}
              required
            />
          </div>
          <p className="my-2">{300 - bio.length}/300 Characters Remaining</p>
          <input
            type="submit"
            className="btn btn-info my-2"
            value="Update Bio"
          />
        </form>
      )}
    </div>
  );
};

export default ChangeBio;
