import Spinner from "components/Spinner";
import AuthContext from "context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "styles/Profile.style.css";

const Profile = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);
  const [userPost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingUser, setDeletingUser] = useState(false);

  useEffect(() => {
    const fetchUserPosts = () => {
      fetch(`https://instant-gram-backend.onrender.com/mypost`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setLoading(false);
          setUserPost(result.posts.reverse());
        })
        .catch((err) => console.log(err));
    };
    setLoading(true);
    fetchUserPosts();
  }, []);

  const deleteProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your account ?")) {
      return;
    }
    try {
      setDeletingUser(true);
      const res = await fetch(
        `https://instant-gram-backend.onrender.com/deleteuser`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await res.json();
      if (!result.error) {
        setDeletingUser(false);
        localStorage.clear();
        setUser(null);
        navigate("/login", { replace: true });
        toast.success("Deleted Profile Successfully!");
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-page py-5">
      {loading ? (
        <Spinner splash="Loading Profile..." />
      ) : (
        <>
          {deletingUser ? (
            <Spinner splash="Wait a few sec.. we are deleting your account!" />
          ) : (
            <>
              <div className="profile ">
                <div className="text-center">
                  <img
                    className="img-fluid rounded-circle profile-image"
                    alt="profile"
                    src={
                      user?.profileImage ||
                      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                    }
                  />
                  <p
                    className="text-lead my-2 mx-2"
                    style={{ maxWidth: "300px" }}
                  >
                    {user?.bio}
                  </p>
                </div>

                <div className="user-info">
                  <h3>{!user ? "" : user.name}</h3>

                  <div className="user-followers">
                    <p className="font-weight-bold">{userPost.length} Posts</p>
                    <Link to="/myfollowers">
                      <p className="font-weight-bold">
                        {user?.followers.length} Follower
                      </p>
                    </Link>
                    <Link to="/myfollowing">
                      <p className="font-weight-bold">
                        {user?.following.length} Following
                      </p>
                    </Link>
                  </div>

                  <Link className="btn btn-info" to="/changepassword">
                    Change Password
                  </Link>
                  <Link className="btn btn-warning mx-2 my-2" to="/changebio">
                    Change Bio
                  </Link>
                  <br />
                  <button
                    className="btn btn-danger my-2"
                    onClick={() => deleteProfile()}
                  >
                    Delete Profile
                  </button>
                </div>
              </div>
              <hr />

              <div className="user-posts row">
                {userPost.map((post) => (
                  <div
                    key={post._id}
                    className="col-sm-12 col-md-6 col-lg-4 my-3 d-block text-center"
                  >
                    <img
                      className="img-fluid user-posts-image"
                      alt="user-posts"
                      src={post.imageURL}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
