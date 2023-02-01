import Spinner from "components/Spinner";
import ToastContext from "context/ToastProvider";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserFollowers = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { toast } = useContext(ToastContext);

  useEffect(() => {
    setLoading(true);
    fetch(`https://instant-gram-backend.onrender.com/myfollowers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (!result.error) {
          setFollowers(result.followers);
          setLoading(false);
        } else {
          toast.error(result.error);
        }
      });
  }, []);

  return (
    <div>
      <Link to="/profile" className="btn btn-danger my-2">
        Go Back
      </Link>
      <h3>Your Followers</h3>
      {loading ? (
        <Spinner splash="Loading followers..." />
      ) : (
        <>
          {followers.length === 0 && (
            <h3 className="text-center my-5">You don't have any followers.</h3>
          )}
          {followers.map((user) => (
            <div
              className="card text-white bg-primary mb-3 animate__animated animate__fadeInDown"
              key={user._id}
            >
              <div className="card-body">
                {/* Joined {moment(user.createdAt).fromNow()} */}
                <h4 className="card-title">{user.name}</h4>
                <div>
                  {user.profileImage && (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="img-fluid my-2 search-profile-image"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
                <Link to={`/profile/${user._id}`} className="btn btn-info">
                  Visit Profile
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default UserFollowers;