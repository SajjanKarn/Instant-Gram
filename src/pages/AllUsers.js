import Spinner from "components/Spinner";
import ToastContext from "context/ToastProvider";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { toast } = useContext(ToastContext);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/allusers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setUsers(result.users.reverse());
        setLoading(false);
      } else {
        toast.error(result.error);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="allusers-page">
      <Link to="/search" className="btn btn-danger">
        Go Back
      </Link>

      {loading ? (
        <Spinner splash="Loading Users..... Please wait" />
      ) : (
        <div className="all-users my-3">
          {useState.length === 0 ? (
            <h3>No users yet!</h3>
          ) : (
            <>
              <div>{users.length} Total users</div>
              {users.map((user) => (
                <>
                  <div class="card text-white bg-primary mb-3" key={user._id}>
                    <div class="card-body">
                      {/* Joined {moment(user.createdAt).fromNow()} */}
                      <h4 class="card-title">{user.name}</h4>
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
                      <Link
                        to={`/profile/${user._id}`}
                        className="btn btn-info"
                      >
                        Visit Profile
                      </Link>
                    </div>
                  </div>
                </>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
